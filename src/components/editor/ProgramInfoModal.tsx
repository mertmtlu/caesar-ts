// src/components/editor/ProgramInfoModal.tsx
import React, { useState } from 'react';
import Modal from '@/components/common/Modal';

interface ProgramInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LanguageTab = 'python' | 'csharp' | 'java' | 'javascript';

const ProgramInfoModal: React.FC<ProgramInfoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<LanguageTab>('python');
  const [activeSection, setActiveSection] = useState<'ui' | 'workflow'>('ui');



  const PythonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 32 32" fill="none">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z" fill="url(#paint0_linear_87_8204)"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z" fill="url(#paint1_linear_87_8204)"/> <defs> <linearGradient id="paint0_linear_87_8204" x1="12.4809" y1="2" x2="12.4809" y2="22.7407" gradientUnits="userSpaceOnUse"> <stop stop-color="#327EBD"/> <stop offset="1" stop-color="#1565A7"/> </linearGradient> <linearGradient id="paint1_linear_87_8204" x1="19.519" y1="9.25928" x2="19.519" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFDA4B"/> <stop offset="1" stop-color="#F9C600"/> </linearGradient> </defs> </g>
    </svg>
  );


  const CSharpIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 288" version="1.1" preserveAspectRatio="xMidYMid">
      <g>
          <path d="M255.569,84.452376 C255.567,79.622376 254.534,75.354376 252.445,71.691376 C250.393,68.089376 247.32,65.070376 243.198,62.683376 C209.173,43.064376 175.115,23.505376 141.101,3.86637605 C131.931,-1.42762395 123.04,-1.23462395 113.938,4.13537605 C100.395,12.122376 32.59,50.969376 12.385,62.672376 C4.064,67.489376 0.015,74.861376 0.013,84.443376 C0,123.898376 0.013,163.352376 0,202.808376 C0,207.532376 0.991,211.717376 2.988,215.325376 C5.041,219.036376 8.157,222.138376 12.374,224.579376 C32.58,236.282376 100.394,275.126376 113.934,283.115376 C123.04,288.488376 131.931,288.680376 141.104,283.384376 C175.119,263.744376 209.179,244.186376 243.209,224.567376 C247.426,222.127376 250.542,219.023376 252.595,215.315376 C254.589,211.707376 255.582,207.522376 255.582,202.797376 C255.582,202.797376 255.582,123.908376 255.569,84.452376" fill="#A179DC" fill-rule="nonzero"/>
          <path d="M128.182,143.241376 L2.988,215.325376 C5.041,219.036376 8.157,222.138376 12.374,224.579376 C32.58,236.282376 100.394,275.126376 113.934,283.115376 C123.04,288.488376 131.931,288.680376 141.104,283.384376 C175.119,263.744376 209.179,244.186376 243.209,224.567376 C247.426,222.127376 250.542,219.023376 252.595,215.315376 L128.182,143.241376" fill="#280068" fill-rule="nonzero"/>
          <path d="M255.569,84.452376 C255.567,79.622376 254.534,75.354376 252.445,71.691376 L128.182,143.241376 L252.595,215.315376 C254.589,211.707376 255.58,207.522376 255.582,202.797376 C255.582,202.797376 255.582,123.908376 255.569,84.452376" fill="#390091" fill-rule="nonzero"/>
          <path d="M201.892326,116.294008 L201.892326,129.767692 L215.36601,129.767692 L215.36601,116.294008 L222.102852,116.294008 L222.102852,129.767692 L235.576537,129.767692 L235.576537,136.504534 L222.102852,136.504534 L222.102852,149.978218 L235.576537,149.978218 L235.576537,156.71506 L222.102852,156.71506 L222.102852,170.188744 L215.36601,170.188744 L215.36601,156.71506 L201.892326,156.71506 L201.892326,170.188744 L195.155484,170.188744 L195.155484,156.71506 L181.6818,156.71506 L181.6818,149.978218 L195.155484,149.978218 L195.155484,136.504534 L181.6818,136.504534 L181.6818,129.767692 L195.155484,129.767692 L195.155484,116.294008 L201.892326,116.294008 Z M215.36601,136.504534 L201.892326,136.504534 L201.892326,149.978218 L215.36601,149.978218 L215.36601,136.504534 Z" fill="#FFFFFF"/>
          <path d="M128.456752,48.625876 C163.600523,48.625876 194.283885,67.7121741 210.718562,96.0819435 L210.558192,95.808876 L169.209615,119.617159 C161.062959,105.823554 146.128136,96.5150717 128.996383,96.3233722 L128.456752,96.3203544 C102.331178,96.3203544 81.1506705,117.499743 81.1506705,143.625316 C81.1506705,152.168931 83.4284453,160.17752 87.3896469,167.094792 C95.543745,181.330045 110.872554,190.931398 128.456752,190.931398 C146.149522,190.931398 161.565636,181.208041 169.67832,166.820563 L169.481192,167.165876 L210.767678,191.083913 C194.51328,219.21347 164.25027,238.240861 129.514977,238.620102 L128.456752,238.625876 C93.2021701,238.625876 62.4315028,219.422052 46.0382398,190.902296 C38.0352471,176.979327 33.4561922,160.837907 33.4561922,143.625316 C33.4561922,91.1592636 75.9884604,48.625876 128.456752,48.625876 Z" fill="#FFFFFF" fill-rule="nonzero"/>
      </g>
    </svg>
  );

  const JavaIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 150 150">
      <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
      <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
      <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
      <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
      <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
    </svg>
  );

  const JavascriptIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 288" preserveAspectRatio="xMinYMin meet">
      <path d="M0 0h256v256H0V0z" fill="#F7DF1E"/>
      <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"/>
    </svg>
  )

  const languages = [
    { id: 'python' as LanguageTab, name: 'Python', available: true, icon: PythonIcon },
    { id: 'csharp' as LanguageTab, name: 'C#', available: true, icon: CSharpIcon },
    { id: 'java' as LanguageTab, name: 'Java', available: false, icon: JavaIcon },
    { id: 'javascript' as LanguageTab, name: 'JavaScript', available: false, icon: JavascriptIcon },
  ];

  const UserInterfaceIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24">
      <defs>
        <style>{`.c{stroke:#6366f1;}.c,.d{fill:none;stroke-linecap:round;stroke-linejoin:round;}.d{stroke:#06b6d4;}`}</style>
      </defs>
      <g id="a"/>
      <g id="b">
        <rect className="c" height="4" width="4" x="2.5" y="2.5"/>
        <rect className="c" height="4" width="4" x="10" y="2.5"/>
        <rect className="c" height="4" width="4" x="17.5" y="2.5"/>
        <rect className="c" height="4" width="4" x="2.5" y="10"/>
        <rect className="c" height="4" width="4" x="10" y="10"/>
        <rect className="c" height="4" width="4" x="17.5" y="10"/>
        <rect className="c" height="4" width="4" x="2.5" y="17.5"/>
        <rect className="c" height="4" width="4" x="10" y="17.5"/>
        <rect className="d" height="4" width="4" x="17.5" y="17.5"/>
      </g>
    </svg>
  )

  const WorkflowIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 1000 1000"><path d="M149.333333 661.333333h213.333334v213.333334H149.333333zM753.066667 411.733333l-119.466667-119.466666c-8.533333-8.533333-8.533333-21.333333 0-29.866667l119.466667-119.466667c8.533333-8.533333 21.333333-8.533333 29.866666 0l119.466667 119.466667c8.533333 8.533333 8.533333 21.333333 0 29.866667l-119.466667 119.466666c-8.533333 8.533333-21.333333 8.533333-29.866666 0z" fill="#00BCD4"/><path d="M256 277.333333m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#3F51B5"/><path d="M768 768m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#448AFF"/><path d="M234.666667 512h42.666666v106.666667h-42.666666z" fill="#90A4AE"/><path d="M256 448l-64 85.333333h128z" fill="#90A4AE"/><path d="M426.666667 256h106.666666v42.666667h-106.666666z" fill="#90A4AE"/><path d="M597.333333 277.333333l-85.333333-64v128z" fill="#90A4AE"/><path d="M746.666667 448h42.666666v106.666667h-42.666666z" fill="#90A4AE"/><path d="M768 618.666667l64-85.333334h-128z" fill="#90A4AE"/></svg>
  )

  const sections = [
    { 
      id: 'ui' as const, 
      name: 'UI Components', 
      description: 'How programs read from UI elements',
      icon: UserInterfaceIcon
    },
    { 
      id: 'workflow' as const, 
      name: 'Workflow Integration', 
      description: 'How programs access workflow inputs',
      icon: WorkflowIcon
    },
  ];

  const renderPythonUIContent = () => (
    <div className="space-y-8">
      {/* Header Section with Icon */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              UI Component Integration
            </h4>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              Connect your Python programs to UI components
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The system automatically generates a <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-mono text-sm">UIComponent.py</code> file 
          based on your UI component configuration. Your programs can import and use this to access user input values seamlessly.
        </p>
      </div>

      {/* Basic Usage Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Basic Usage
            </h5>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Import and access UI component values in three simple lines
          </p>
        </div>
        <div className="p-6">
          <pre className="bg-gray-900 dark:bg-gray-950 p-6 rounded-lg overflow-x-auto text-sm border border-gray-700">
            <code className="text-gray-100">
              <span className="text-pink-400">from</span> <span className="text-blue-300">UIComponent</span> <span className="text-pink-400">import</span> <span className="text-yellow-300">ui</span>
              <br /><br />
              <span className="text-gray-500"># Access UI element values</span><br />
              <span className="text-yellow-300">user_input</span> <span className="text-pink-400">=</span> <span className="text-blue-300">ui</span>.<span className="text-green-400">input_field_name</span><br />
              <span className="text-yellow-300">table_data</span> <span className="text-pink-400">=</span> <span className="text-blue-300">ui</span>.<span className="text-green-400">data_table</span><br />
              <span className="text-yellow-300">dropdown_value</span> <span className="text-pink-400">=</span> <span className="text-blue-300">ui</span>.<span className="text-green-400">dropdown_selection</span>
            </code>
          </pre>
        </div>
      </div>

      {/* Matrix Processing Example Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Matrix Processing Example
              </h5>
              <p className="text-purple-600 dark:text-purple-400 text-sm">
                Advanced data extraction from table components
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Extract and process matrix data from table UI components with full error handling and validation:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-gray-400 text-xs font-mono">matrix_processor.py</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-100">
                <span className="text-pink-400">import</span> <span className="text-blue-300">numpy</span> <span className="text-pink-400">as</span> <span className="text-yellow-300">np</span><br />
                <span className="text-pink-400">from</span> <span className="text-blue-300">UIComponent</span> <span className="text-pink-400">import</span> <span className="text-yellow-300">ui</span>
                <br /><br />
                <span className="text-pink-400">def</span> <span className="text-blue-400">parse_cell_reference</span>(<span className="text-yellow-300">cell_ref</span>):
                <br />
                {'    '}<span className="text-gray-500">"""Parse cell reference like 'a1' to row, col indices"""</span><br />
                {'    '}<span className="text-yellow-300">col</span> <span className="text-pink-400">=</span> <span className="text-green-400">ord</span>(<span className="text-yellow-300">cell_ref</span>[<span className="text-orange-400">0</span>].<span className="text-blue-400">lower</span>()) <span className="text-pink-400">-</span> <span className="text-green-400">ord</span>(<span className="text-green-300">'a'</span>)<br />
                {'    '}<span className="text-yellow-300">row</span> <span className="text-pink-400">=</span> <span className="text-green-400">int</span>(<span className="text-yellow-300">cell_ref</span>[<span className="text-orange-400">1</span>:]) <span className="text-pink-400">-</span> <span className="text-orange-400">1</span><br />
                {'    '}<span className="text-pink-400">return</span> <span className="text-yellow-300">row</span>, <span className="text-yellow-300">col</span>
                <br /><br />
                <span className="text-pink-400">def</span> <span className="text-blue-400">extract_matrix_from_data_table</span>(<span className="text-yellow-300">data_table</span>):
                <br />
                {'    '}<span className="text-gray-500">"""Extract matrix from data table and convert to float values"""</span><br />
                {'    '}<span className="text-gray-500"># Find the dimensions by examining all cell references</span><br />
                {'    '}<span className="text-yellow-300">max_row</span> <span className="text-pink-400">=</span> <span className="text-orange-400">0</span><br />
                {'    '}<span className="text-yellow-300">max_col</span> <span className="text-pink-400">=</span> <span className="text-orange-400">0</span><br /><br />
                {'    '}<span className="text-pink-400">for</span> <span className="text-yellow-300">cell_ref</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">data_table</span>.<span className="text-blue-400">keys</span>():<br />
                {'        '}<span className="text-yellow-300">row</span>, <span className="text-yellow-300">col</span> <span className="text-pink-400">=</span> <span className="text-blue-400">parse_cell_reference</span>(<span className="text-yellow-300">cell_ref</span>)<br />
                {'        '}<span className="text-yellow-300">max_row</span> <span className="text-pink-400">=</span> <span className="text-green-400">max</span>(<span className="text-yellow-300">max_row</span>, <span className="text-yellow-300">row</span>)<br />
                {'        '}<span className="text-yellow-300">max_col</span> <span className="text-pink-400">=</span> <span className="text-green-400">max</span>(<span className="text-yellow-300">max_col</span>, <span className="text-yellow-300">col</span>)<br /><br />
                {'    '}<span className="text-gray-500"># Create matrix with proper dimensions</span><br />
                {'    '}<span className="text-yellow-300">matrix</span> <span className="text-pink-400">=</span> <span className="text-blue-300">np</span>.<span className="text-blue-400">zeros</span>((<span className="text-yellow-300">max_row</span> <span className="text-pink-400">+</span> <span className="text-orange-400">1</span>, <span className="text-yellow-300">max_col</span> <span className="text-pink-400">+</span> <span className="text-orange-400">1</span>))<br /><br />
                {'    '}<span className="text-pink-400">for</span> <span className="text-yellow-300">cell_ref</span>, <span className="text-yellow-300">value</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">data_table</span>.<span className="text-blue-400">items</span>():<br />
                {'        '}<span className="text-yellow-300">row</span>, <span className="text-yellow-300">col</span> <span className="text-pink-400">=</span> <span className="text-blue-400">parse_cell_reference</span>(<span className="text-yellow-300">cell_ref</span>)<br />
                {'        '}<span className="text-pink-400">try</span>:<br />
                {'            '}<span className="text-yellow-300">matrix</span>[<span className="text-yellow-300">row</span>, <span className="text-yellow-300">col</span>] <span className="text-pink-400">=</span> <span className="text-green-400">float</span>(<span className="text-yellow-300">value</span>)<br />
                {'        '}<span className="text-pink-400">except</span> (<span className="text-blue-300">ValueError</span>, <span className="text-blue-300">TypeError</span>):<br />
                {'            '}<span className="text-green-400">print</span>(<span className="text-green-300">f"Warning: Could not convert '</span>{'{value}'}<span className="text-green-300">' to float"</span>)<br />
                {'            '}<span className="text-yellow-300">matrix</span>[<span className="text-yellow-300">row</span>, <span className="text-yellow-300">col</span>] <span className="text-pink-400">=</span> <span className="text-orange-400">0.0</span><br /><br />
                {'    '}<span className="text-pink-400">return</span> <span className="text-yellow-300">matrix</span><br /><br />
                <span className="text-gray-500"># Use the UI component data</span><br />
                <span className="text-pink-400">if</span> <span className="text-blue-300">__name__</span> <span className="text-pink-400">==</span> <span className="text-green-300">"__main__"</span>:<br />
                {'    '}<span className="text-yellow-300">matrix</span> <span className="text-pink-400">=</span> <span className="text-blue-400">extract_matrix_from_data_table</span>(<span className="text-blue-300">ui</span>.<span className="text-green-400">data_table</span>)<br />
                {'    '}<span className="text-yellow-300">inverse_matrix</span> <span className="text-pink-400">=</span> <span className="text-blue-300">np</span>.<span className="text-blue-300">linalg</span>.<span className="text-blue-400">inv</span>(<span className="text-yellow-300">matrix</span>)<br />
                {'    '}<span className="text-green-400">print</span>(<span className="text-green-300">"Matrix processed successfully!"</span>)
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Generated DTO Classes Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Generated DTO Classes
              </h5>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                Automatically generated data transfer objects for complex components
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Complex component types like <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">map_input</code> and <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">file_input</code> use automatically generated Data Transfer Object classes:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-gray-400 text-xs font-mono">UIComponent.py (auto-generated)</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-100">
                <span className="text-gray-500"># DTO classes are automatically generated at the top of the file</span><br />
                <span className="text-pink-400">class</span> <span className="text-blue-400">NamedPointDto</span>:
                <br />
                {'    '}<span className="text-yellow-300">id</span>: <span className="text-green-400">str</span><br />
                {'    '}<span className="text-yellow-300">name</span>: <span className="text-green-400">str</span><br />
                {'    '}<span className="text-yellow-300">lat</span>: <span className="text-green-400">float</span><br />
                {'    '}<span className="text-yellow-300">lng</span>: <span className="text-green-400">float</span><br /><br />
                <span className="text-pink-400">class</span> <span className="text-blue-400">FileDataDto</span>:
                <br />
                {'    '}<span className="text-yellow-300">id</span>: <span className="text-green-400">str</span><br />
                {'    '}<span className="text-yellow-300">name</span>: <span className="text-green-400">str</span><br />
                {'    '}<span className="text-yellow-300">size</span>: <span className="text-green-400">int</span><br />
                {'    '}<span className="text-yellow-300">type</span>: <span className="text-green-400">str</span><br />
                {'    '}<span className="text-yellow-300">checksum</span>: <span className="text-blue-400">Optional</span>[<span className="text-green-400">str</span>]<br />
                {'    '}<span className="text-yellow-300">base64_content</span>: <span className="text-blue-400">Optional</span>[<span className="text-green-400">str</span>]<br />
                {'    '}<span className="text-yellow-300">filename</span>: <span className="text-blue-400">Optional</span>[<span className="text-green-400">str</span>]
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Available Properties Reference Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-lg mr-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available Properties
            </h5>
            <p className="text-amber-600 dark:text-amber-400 text-sm">
              Quick reference for UIComponent methods and properties
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.property_name</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Access any UI element by its name</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.get_value('name', default)</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Get value with default fallback</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.get_all_values()</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Get dictionary of all values</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.data_table</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Access table data as dictionary</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.cell_name</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Direct access to table cells</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.validate()</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Validate all required fields</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCSharpUIContent = () => (
    <div className="space-y-8">
      {/* Header Section with Icon */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              UI Component Integration
            </h4>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              Connect your C# programs to UI components
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The system automatically generates a <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-mono text-sm">UIComponent.cs</code> file 
          based on your UI component configuration. Your programs can load and use this to access user input values seamlessly.
        </p>
      </div>

      {/* Basic Usage Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Basic Usage
            </h5>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Load and access UI component values using the generated static Load method
          </p>
        </div>
        <div className="p-6">
          <pre className="bg-gray-900 dark:bg-gray-950 p-6 rounded-lg overflow-x-auto text-sm border border-gray-700">
            <code className="text-gray-100">
              <span className="text-gray-500">// In your Program.cs or main method</span><br />
              <span className="text-pink-400">using</span> <span className="text-blue-300">TeiasProject</span>;
              <br /><br />
              <span className="text-pink-400">public class</span> <span className="text-blue-400">Program</span><br />
              {'{'}<br />
              {'    '}<span className="text-pink-400">public static void</span> <span className="text-blue-400">Main</span>(<span className="text-pink-400">string</span>[] <span className="text-yellow-300">args</span>)<br />
              {'    {'}<br />
              {'        '}<span className="text-pink-400">var</span> <span className="text-yellow-300">ui</span> = <span className="text-blue-400">UIComponent</span>.<span className="text-green-400">Load</span>(<span className="text-yellow-300">args</span>);<br /><br />
              {'        '}<span className="text-gray-500">// Access UI element values</span><br />
              {'        '}<span className="text-pink-400">string</span>? <span className="text-yellow-300">userInput</span> = <span className="text-yellow-300">ui</span>.<span className="text-green-400">InputFieldName</span>;<br />
              {'        '}<span className="text-blue-400">List</span>&lt;<span className="text-blue-400">Dictionary</span>&lt;<span className="text-pink-400">string</span>, <span className="text-pink-400">object</span>&gt;&gt;? <span className="text-yellow-300">tableData</span> = <span className="text-yellow-300">ui</span>.<span className="text-green-400">DataTable</span>;<br />
              {'        '}<span className="text-blue-400">List</span>&lt;<span className="text-blue-400">NamedPointDto</span>&gt;? <span className="text-yellow-300">locations</span> = <span className="text-yellow-300">ui</span>.<span className="text-green-400">LocationPicker</span>;<br />
              {'    }'}<br />
              {'}'}
            </code>
          </pre>
        </div>
      </div>

      {/* Matrix Processing Example Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Matrix Processing Example
              </h5>
              <p className="text-purple-600 dark:text-purple-400 text-sm">
                Advanced data extraction from table components
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Extract and process matrix data from table UI components with full type safety and validation:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-gray-400 text-xs font-mono">Program.cs</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-100">
                <span className="text-gray-500">// Assumes a table element named 'data_table'</span><br />
                <span className="text-gray-500">// and a cell with a custom name 'TotalSum'</span><br />
                <span className="text-pink-400">var</span> <span className="text-yellow-300">ui</span> = <span className="text-blue-400">UIComponent</span>.<span className="text-green-400">Load</span>(<span className="text-yellow-300">args</span>);<br /><br />
                <span className="text-gray-500">// Access the whole table as a dictionary</span><br />
                <span className="text-pink-400">var</span> <span className="text-yellow-300">table</span> = <span className="text-yellow-300">ui</span>.<span className="text-green-400">DataTable</span>;<br />
                <span className="text-pink-400">if</span> (<span className="text-yellow-300">table</span> != <span className="text-pink-400">null</span> && <span className="text-yellow-300">table</span>.<span className="text-green-400">TryGetValue</span>(<span className="text-green-300">"A1"</span>, <span className="text-pink-400">out var</span> <span className="text-yellow-300">cellValue</span>))<br />
                {'{'}<br />
                {'    '}<span className="text-blue-400">Console</span>.<span className="text-green-400">WriteLine</span>($<span className="text-green-300">"Cell A1 value: </span>{'{cellValue}'}<span className="text-green-300">"</span>);<br />
                {'}'}<br /><br />
                <span className="text-gray-500">// Access a named cell directly</span><br />
                <span className="text-pink-400">double</span>? <span className="text-yellow-300">totalSum</span> = <span className="text-yellow-300">ui</span>.<span className="text-green-400">TotalSum</span>;<br />
                <span className="text-blue-400">Console</span>.<span className="text-green-400">WriteLine</span>($<span className="text-green-300">"Total Sum: </span>{'{totalSum}'}<span className="text-green-300">"</span>);
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Generated DTO Classes Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Generated DTO Classes
              </h5>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                Strongly-typed data transfer objects for complex components
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Complex component types like <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">map_input</code> and <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">file_input</code> use strongly-typed Data Transfer Objects (DTOs) like <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">List&lt;NamedPointDto&gt;</code> and <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">List&lt;FileDataDto&gt;</code>. These classes are defined in a shared project and are automatically available to your program.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3 mt-1">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-1">
                  Shared Library Integration
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  DTOs are automatically referenced from the shared TeiasProject library, providing consistent type definitions across all your C# programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Properties Reference Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-lg mr-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available Properties
            </h5>
            <p className="text-amber-600 dark:text-amber-400 text-sm">
              Quick reference for UIComponent properties and methods
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.PropertyName</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Access any UI element by its PascalCase name</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">UIComponent.Load(args)</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Static method to deserialize from command-line args</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.DataTable</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Access table data as Dictionary&lt;string, object&gt;</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">ui.CellName</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Direct access to named table cells</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">List&lt;NamedPointDto&gt;</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Map component data with lat/lng coordinates</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">List&lt;FileDataDto&gt;</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">File input component data with metadata</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPythonWorkflowContent = () => (
    <div className="space-y-8">
      {/* Header Section with Icon */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-cyan-200 dark:border-cyan-800">
        <div className="flex items-center mb-4">
          <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              Workflow Integration
            </h4>
            <p className="text-cyan-600 dark:text-cyan-400 text-sm">
              Access outputs from previous workflow nodes seamlessly
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          When your program is part of a workflow, the system generates a <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md border border-cyan-200 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 font-mono text-sm">WorkflowInputs.py</code> file 
          that provides access to outputs from previous workflow nodes with full type safety and error handling.
        </p>
      </div>

      {/* Basic Workflow Usage Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Basic Workflow Usage
            </h5>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Simple patterns to access workflow node data
          </p>
        </div>
        <div className="p-6">
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-gray-400 text-xs font-mono">workflow_basic.py</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-100">
                <span className="text-pink-400">from</span> <span className="text-blue-300">WorkflowInputs</span> <span className="text-pink-400">import</span> <span className="text-yellow-300">nodes</span>
                <br /><br />
                <span className="text-gray-500"># Access all workflow nodes</span><br />
                <span className="text-pink-400">for</span> <span className="text-yellow-300">node</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">nodes</span>:<br />
                {'    '}<span className="text-green-400">print</span>(<span className="text-green-300">f"Node: </span>{'{node.name}'}<span className="text-green-300">"</span>)<br />
                {'    '}<span className="text-yellow-300">status</span> <span className="text-pink-400">=</span> <span className="text-green-300">"✓"</span> <span className="text-pink-400">if</span> <span className="text-yellow-300">node</span>.<span className="text-blue-400">success</span> <span className="text-pink-400">else</span> <span className="text-green-300">"✗"</span><br />
                {'    '}<span className="text-green-400">print</span>(<span className="text-green-300">f"Status: </span>{'{status}'}<span className="text-green-300">"</span>)<br />
                {'    '}<span className="text-green-400">print</span>(<span className="text-green-300">f"Output: </span>{'{node.stdout}'}<span className="text-green-300">"</span>)<br /><br />
                <span className="text-gray-500"># Access specific node</span><br />
                <span className="text-yellow-300">specific_node</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">nodes</span>.<span className="text-blue-400">get_node</span>(<span className="text-green-300">'NodeName'</span>)<br />
                <span className="text-yellow-300">result</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">specific_node</span>.<span className="text-blue-400">stdout</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* File Processing Example Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                File Processing Example
              </h5>
              <p className="text-teal-600 dark:text-teal-400 text-sm">
                Process files from previous workflow nodes
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Access and process files from previous workflow nodes with automatic file type detection:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-gray-400 text-xs font-mono">file_processor.py</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-100">
                <span className="text-pink-400">from</span> <span className="text-blue-300">WorkflowInputs</span> <span className="text-pink-400">import</span> <span className="text-yellow-300">nodes</span>
                <br /><br />
                <span className="text-green-400">print</span>(<span className="text-green-300">"Files from all workflow nodes:"</span>)<br />
                <span className="text-green-400">print</span>(<span className="text-green-300">"=" * 50</span>)<br /><br />
                <span className="text-pink-400">for</span> <span className="text-yellow-300">node</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">nodes</span>:<br />
                {'    '}<span className="text-pink-400">if</span> <span className="text-green-400">len</span>(<span className="text-yellow-300">node</span>.<span className="text-blue-400">files</span>) <span className="text-pink-400">&gt;</span> <span className="text-orange-400">0</span>:<br />
                {'        '}<span className="text-green-400">print</span>(<span className="text-green-300">f"\\nNode: </span>{'{node.name}'}<span className="text-green-300">"</span>)<br />
                {'        '}<span className="text-pink-400">for</span> <span className="text-yellow-300">file</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">node</span>.<span className="text-blue-400">files</span>:<br />
                {'            '}<span className="text-green-400">print</span>(<span className="text-green-300">f"  Name: </span>{'{file.name}'}<span className="text-green-300">"</span>)<br />
                {'            '}<span className="text-green-400">print</span>(<span className="text-green-300">f"  Path: </span>{'{file.path}'}<span className="text-green-300">"</span>)<br /><br />
                {'            '}<span className="text-gray-500"># Read file content if needed</span><br />
                {'            '}<span className="text-pink-400">if</span> <span className="text-yellow-300">file</span>.<span className="text-blue-400">name</span>.<span className="text-blue-400">endswith</span>(<span className="text-green-300">'.txt'</span>):<br />
                {'                '}<span className="text-yellow-300">content</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">file</span>.<span className="text-blue-400">read_text</span>()<br />
                {'                '}<span className="text-green-400">print</span>(<span className="text-green-300">f"  Preview: </span>{'{content[:100]}'}<span className="text-green-300">..."</span>)<br />
                {'    '}<span className="text-pink-400">else</span>:<br />
                {'        '}<span className="text-green-400">print</span>(<span className="text-green-300">f"\\nNode: </span>{'{node.name}'}<span className="text-green-300"> - No files"</span>)<br /><br />
                <span className="text-green-400">print</span>(<span className="text-green-300">"\\nProcessing complete!"</span>)
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Advanced Workflow Access Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className="bg-violet-100 dark:bg-violet-900 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Advanced Workflow Access
              </h5>
              <p className="text-violet-600 dark:text-violet-400 text-sm">
                Comprehensive workflow data processing patterns
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Advanced patterns for workflow status checking, error handling, and data extraction:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-gray-400 text-xs font-mono">advanced_workflow.py</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-100">
                <span className="text-pink-400">from</span> <span className="text-blue-300">WorkflowInputs</span> <span className="text-pink-400">import</span> <span className="text-yellow-300">inputs</span>, <span className="text-yellow-300">nodes</span>
                <br /><br />
                <span className="text-gray-500"># Check workflow status</span><br />
                <span className="text-pink-400">if</span> <span className="text-yellow-300">inputs</span>.<span className="text-blue-400">has_failures</span>():<br />
                {'    '}<span className="text-yellow-300">failed_nodes</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">inputs</span>.<span className="text-blue-400">get_failed_programs</span>()<br />
                {'    '}<span className="text-green-400">print</span>(<span className="text-green-300">f"Warning: </span>{'{len(failed_nodes)}'}<span className="text-green-300"> nodes failed"</span>)<br /><br />
                <span className="text-gray-500"># Get successful nodes only</span><br />
                <span className="text-yellow-300">successful_nodes</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">nodes</span>.<span className="text-blue-400">get_successful_nodes</span>()<br />
                <span className="text-pink-400">for</span> <span className="text-yellow-300">node</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">successful_nodes</span>:<br />
                {'    '}<span className="text-green-400">print</span>(<span className="text-green-300">f"✓ </span>{'{node.name}'}<span className="text-green-300">: </span>{'{node.duration}'}<span className="text-green-300">"</span>)<br /><br />
                {'    '}<span className="text-gray-500"># Access node outputs</span><br />
                {'    '}<span className="text-pink-400">if</span> <span className="text-yellow-300">node</span>.<span className="text-blue-400">stdout</span>:<br />
                {'        '}<span className="text-green-400">print</span>(<span className="text-green-300">f"  Output: </span>{'{node.stdout}'}<span className="text-green-300">"</span>)<br /><br />
                {'    '}<span className="text-gray-500"># Process node files by type</span><br />
                {'    '}<span className="text-pink-400">for</span> <span className="text-yellow-300">file</span> <span className="text-pink-400">in</span> <span className="text-yellow-300">node</span>.<span className="text-blue-400">files</span>:<br />
                {'        '}<span className="text-pink-400">if</span> <span className="text-yellow-300">file</span>.<span className="text-blue-400">extension</span> <span className="text-pink-400">==</span> <span className="text-green-300">'.csv'</span>:<br />
                {'            '}<span className="text-yellow-300">data</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">file</span>.<span className="text-blue-400">read_text</span>()<br />
                {'            '}<span className="text-gray-500"># Process CSV data...</span><br /><br />
                <span className="text-gray-500"># Access specific node with bracket notation</span><br />
                <span className="text-yellow-300">node</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">nodes</span>[<span className="text-green-300">'DataProcessor'</span>]<br />
                <span className="text-pink-400">if</span> <span className="text-yellow-300">node</span>.<span className="text-blue-400">success</span>:<br />
                {'    '}<span className="text-yellow-300">result</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">node</span>.<span className="text-blue-400">get</span>(<span className="text-green-300">'customField'</span>, <span className="text-green-300">'default'</span>)<br />
                {'    '}<span className="text-green-400">print</span>(<span className="text-green-300">f"Custom result: </span>{'{result}'}<span className="text-green-300">"</span>)
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Available Node Properties Reference Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg mr-3">
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available Node Properties
            </h5>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm">
              Quick reference for WorkflowNode methods and properties
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.name</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Node name identifier</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.stdout</code> / <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.print</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Program output text</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.stderr</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Error output text</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.success</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Boolean execution status</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.exit_code</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Program exit code number</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.duration</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Execution time string</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.files</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">List of output files</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold">node.get(key, default)</code>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Custom field access method</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComingSoonContent = (language: string) => {
    const languageInfo = languages.find(l => l.name === language);
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-800 p-12 mx-auto max-w-md">
          <div className="text-6xl mb-4">{languageInfo?.icon || '🚧'}</div>
          <h4 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            {language} Examples
          </h4>
          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Coming Soon
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We're actively working on adding comprehensive {language} examples for program integration.
            <br /><br />
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Check back soon for complete {language} code samples!
            </span>
          </p>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 'python') {
      return activeSection === 'ui' ? renderPythonUIContent() : renderPythonWorkflowContent();
    } else if (activeTab === 'csharp') {
      return activeSection === 'ui' ? renderCSharpUIContent() : renderComingSoonContent('C# Workflow');
    } else {
      const language = languages.find(l => l.id === activeTab);
      return renderComingSoonContent(language?.name || 'Language');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      title="Program Integration Guide"
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {/* Enhanced Language Tabs with Section Navigation */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 mb-6">
          <nav className="flex items-center justify-between">
            <div className="flex space-x-1">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => setActiveTab(language.id)}
                  disabled={!language.available}
                  className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                    activeTab === language.id
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-700'
                      : language.available
                      ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span className="mr-2 text-lg">{language.icon}</span>
                  {language.name}
                  {!language.available && (
                    <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Section Navigation (only for available languages) */}
            {(activeTab === 'python' || activeTab === 'csharp') && (
              <div className="flex items-center space-x-1">
                {sections.map((section, index) => (
                  <React.Fragment key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center px-3 py-1.5 text-xs font-medium transition-colors duration-200 rounded-md ${
                        activeSection === section.id
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="w-6 h-6 mr-1.5 flex-shrink-0">{section.icon}</span>
                      {section.name}
                    </button>
                    {index < sections.length - 1 && (
                      <div className="w-px h-3 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </nav>
        </div>

        {/* Enhanced Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-none">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProgramInfoModal;