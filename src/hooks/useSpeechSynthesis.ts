'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechSynthesisProps {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export function useSpeechSynthesis({ onStart, onEnd, onError }: UseSpeechSynthesisProps = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        // Prefer natural sounding English voices
        const preferred =
          availableVoices.find(
            (v) =>
              (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')) &&
              v.lang.startsWith('en'),
          ) ||
          availableVoices.find((v) => v.lang.startsWith('en')) ||
          availableVoices[0] ||
          null;

        selectedVoiceRef.current = preferred;
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text.trim()) {
        return;
      }

      // Cancel previous utterances
      window.speechSynthesis.cancel();

      // Clean markdown characters or code blocks from spoken text for natural speech
      const cleanText = text
        .replace(/```[\s\S]*?```/g, 'Code snippet provided on screen.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[*_#]/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (selectedVoiceRef.current) {
        utterance.voice = selectedVoiceRef.current;
      }
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        onStart?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      utterance.onerror = (e) => {
        setIsSpeaking(false);
        onError?.(e);
      };

      window.speechSynthesis.speak(utterance);
    },
    [onStart, onEnd, onError],
  );

  return {
    speak,
    cancel,
    isSpeaking,
    isSupported,
    voices,
  };
}

