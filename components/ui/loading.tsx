import { Loader2 } from 'lucide-react';

export default function LoadingComponent(){
    return <div className="flex justify-center items-center h-screen">
             <Loader2 className="animate-spin text-blue-400" size={48} />
          </div>
}