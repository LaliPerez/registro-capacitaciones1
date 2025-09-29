import React, { useState } from 'react';
import { PlusIcon, SpinnerIcon } from './Icons';

interface LinkInputFormProps {
  onAddLink: (url: string) => void;
  isLoading: boolean;
}

const LinkInputForm: React.FC<LinkInputFormProps> = ({ onAddLink, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return;
    }
    
    setError('');
    onAddLink(url);
    setUrl('');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) {
        setError('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={handleChange}
          placeholder="https://example.com"
          className="flex-grow px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-100 disabled:opacity-50"
          disabled={isLoading}
          aria-label="Enter a URL to add"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-900"
          disabled={isLoading}
          aria-label="Add URL"
        >
          {isLoading ? <SpinnerIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
          <span>Add</span>
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
};

export default LinkInputForm;