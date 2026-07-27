import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useJobStore, JobFilters } from '@/store/useJobStore';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  options: FilterOption[];
  filterKey: keyof JobFilters;
}

const CheckboxFilterSection = ({ title, defaultOpen = true, options, filterKey }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { filters, setFilter } = useJobStore();

  const currentValues = filters[filterKey] 
    ? String(filters[filterKey]).split(',').filter(Boolean) 
    : [];

  const toggleOption = (value: string) => {
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    setFilter(filterKey, newValues.join(','));
  };

  return (
    <div className="py-4 border-b border-slate-100 dark:border-zinc-800 px-4 -mx-4">
      <div 
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </div>
      
      {isOpen && (
        <div className="flex flex-col gap-2 mt-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={currentValues.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white dark:bg-zinc-800 dark:border-zinc-700 w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export function JobFiltersSidebar() {
  const { setFilter } = useJobStore();

  const resetFilters = () => {
    setFilter('search', '');
    setFilter('location', '');
    setFilter('languages', '');
    setFilter('educationLevel', '');
    setFilter('employmentTypes', '');
    setFilter('nature', '');
    setFilter('minSalary', undefined);
    setFilter('maxSalary', undefined);
  };

  return (
    <div className="w-[280px] shrink-0 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 px-4 py-2">
      <div className="py-4 border-b border-slate-100 dark:border-zinc-800 px-4 -mx-4 flex justify-between items-center">
        <span className="font-semibold text-sm text-slate-900 dark:text-white">Filters</span>
        <button 
          onClick={resetFilters}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          Clear All
        </button>
      </div>
      
      <CheckboxFilterSection 
        title="Work modes" 
        filterKey="nature"
        options={[
          { label: 'Remote', value: 'remote' },
          { label: 'Hybrid', value: 'hybrid' },
          { label: 'On-site', value: 'onsite' },
        ]}
      />

      <CheckboxFilterSection 
        title="Job type" 
        filterKey="employmentTypes"
        options={[
          { label: 'Full Time', value: 'Full Time' },
          { label: 'Part Time', value: 'Part Time' },
          { label: 'Contract', value: 'Contract' },
          { label: 'Internship', value: 'Internship' },
        ]}
      />

      <CheckboxFilterSection 
        title="Education level" 
        filterKey="educationLevel"
        options={[
          { label: 'High School', value: 'High School' },
          { label: 'Bachelor Degree', value: 'Bachelor Degree' },
          { label: 'Master Degree', value: 'Master Degree' },
          { label: 'PhD', value: 'PhD' },
        ]}
      />

      <CheckboxFilterSection 
        title="Work Language" 
        filterKey="languages"
        options={[
          { label: 'English', value: 'English' },
          { label: 'Spanish', value: 'Spanish' },
          { label: 'French', value: 'French' },
          { label: 'German', value: 'German' },
        ]}
      />
    </div>
  );
}
