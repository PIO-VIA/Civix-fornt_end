'use client';

import { useState } from 'react';
import { ElectionsService } from '@/lib/services/ElectionsService';
import { CandidatsPublicService } from '@/lib/services/CandidatsPublicService';

export function ApiTest() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const testElections = async () => {
    setLoading(prev => ({ ...prev, elections: true }));
    try {
      console.log('🧪 Testing Elections API...');
      const result = await ElectionsService.listerToutesElections();
      console.log('✅ Elections result:', result);
      setResults(prev => ({ ...prev, elections: { success: true, data: result } }));
    } catch (error: any) {
      console.error('❌ Elections error:', error);
      setResults(prev => ({ ...prev, elections: { success: false, error: error.message || error.toString() } }));
    } finally {
      setLoading(prev => ({ ...prev, elections: false }));
    }
  };

  const testCandidats = async () => {
    setLoading(prev => ({ ...prev, candidats: true }));
    try {
      console.log('🧪 Testing Candidats API...');
      const result = await CandidatsPublicService.obtenirTousCandidatsPublic();
      console.log('✅ Candidats result:', result);
      setResults(prev => ({ ...prev, candidats: { success: true, data: result } }));
    } catch (error: any) {
      console.error('❌ Candidats error:', error);
      setResults(prev => ({ ...prev, candidats: { success: false, error: error.message || error.toString() } }));
    } finally {
      setLoading(prev => ({ ...prev, candidats: false }));
    }
  };

  const testDirectAxios = async () => {
    setLoading(prev => ({ ...prev, axios: true }));
    try {
      console.log('🧪 Testing direct Axios call...');
      const response = await fetch('http://localhost:8080/api/elections', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Direct fetch result:', data);
      setResults(prev => ({ ...prev, axios: { success: true, data } }));
    } catch (error) {
      console.error('❌ Direct fetch error:', error);
      setResults(prev => ({ ...prev, axios: { success: false, error: error.message } }));
    } finally {
      setLoading(prev => ({ ...prev, axios: false }));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4">API Test Debug</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={testElections}
            disabled={loading.elections}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading.elections ? 'Testing...' : 'Test Elections API'}
          </button>
          
          <button
            onClick={testCandidats}
            disabled={loading.candidats}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading.candidats ? 'Testing...' : 'Test Candidats API'}
          </button>
          
          <button
            onClick={testDirectAxios}
            disabled={loading.axios}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {loading.axios ? 'Testing...' : 'Test Direct Fetch'}
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(results).map(([key, result]: [string, any]) => (
            <div key={key} className="p-4 border rounded">
              <h3 className="font-semibold capitalize">{key} Result:</h3>
              <pre className="text-sm mt-2 bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}