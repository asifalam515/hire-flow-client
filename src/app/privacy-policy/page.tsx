import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFF5FF] dark:bg-slate-950 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex flex-col items-center">
        {/* Header Section */}
        <section className="w-full pt-24 pb-12 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            The Hire Flow Privacy policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Our personal statement, cookies, third-parties
          </p>
        </section>

        {/* Content Section */}
        <section className="w-full max-w-4xl mx-auto px-4 md:px-8 pb-24 text-slate-700 dark:text-slate-300">
          <div className="space-y-12">
            
            {/* Personal Statement */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Personal Statement
              </h2>
              <p className="leading-relaxed">
                This section serves as an introduction to the document. It explains the purpose of the statement, emphasizing our commitment to user privacy and transparency regarding data collection and usage practices. We value your trust and strive to protect your personal information.
              </p>
            </div>

            {/* What are cookies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                What are 'cookies'?
              </h2>
              <p className="leading-relaxed">
                Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you visit a website. They are used to remember information about your visit, such as your preferences and login details. Cookies can be classified into two main types:
              </p>
              <div className="pl-4 space-y-2">
                <p><span className="font-semibold text-slate-900 dark:text-white">1. Session Cookies:</span> Temporary cookies that expire once you close your browser.</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">2. Persistent Cookies:</span> Cookies that remain on your device for a set period or until you delete them.</p>
              </div>
            </div>

            {/* Why do we use cookies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Why do we use cookies?
              </h2>
              <p className="leading-relaxed">
                We use cookies for various reasons, including:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Enhancing User Experience:</span> Cookies help us remember your preferences and settings, making your visits more personalized.
                </li>
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Analytics:</span> We use cookies to gather data on how visitors interact with our website, allowing us to improve functionality and content.
                </li>
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Advertising:</span> Cookies can help us deliver relevant advertisements to you based on your interests and browsing behavior.
                </li>
              </ul>
            </div>

            {/* What information do we gather specifically */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                What information do we gather specifically?
              </h2>
              <p className="leading-relaxed">
                We gather various types of information through cookies, including:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">User Preferences:</span> Language settings, display preferences, and other customization options.
                </li>
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Usage Data:</span> Information about how you interact with our website (pages visited, time spent, links clicked).
                </li>
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Device Information:</span> Details about the device you are using, such as operating system, browser type, and IP address.
                </li>
              </ul>
            </div>

            {/* What third-parties do we share your information with */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                What third-parties do we share your information with?
              </h2>
              <p className="leading-relaxed">
                We may share your information with trusted third parties to enhance our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Analytics Providers:</span> Companies that help us analyze website traffic and user behavior.
                </li>
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Advertising Partners:</span> Third-party advertisers who may use your data to serve targeted ads.
                </li>
                <li>
                  <span className="font-semibold text-slate-900 dark:text-white">Service Providers:</span> Vendors who assist us in operating our website or conducting our business.
                </li>
              </ul>
            </div>

            {/* Website media */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Website media
              </h2>
              <p className="leading-relaxed">
                This section refers to any media content available on our website, such as images, videos, and audio files. We ensure that all media complies with copyright laws and respect the rights of content creators. Users may not reproduce or distribute this media without permission.
              </p>
            </div>

            {/* Disclosure of your information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Disclosure of your information
              </h2>
              <p className="leading-relaxed">
                We will not sell or rent your personal information to third parties. However, we may disclose your information if required by law or in response to valid requests by public authorities. We take appropriate measures to protect your information and ensure it is handled responsibly.
              </p>
            </div>

            {/* Updates */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Updates
              </h2>
              <p className="leading-relaxed">
                We may update this personal statement from time to time to reflect changes in our practices or applicable laws. We encourage you to review this document periodically for any updates. The date of the last revision will be indicated at the top of the statement.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
