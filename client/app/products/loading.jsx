import { Loader2 } from 'lucide-react';
export default function loading() {
  return (
    <div className="grid place-items-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    </div>
  );
}
