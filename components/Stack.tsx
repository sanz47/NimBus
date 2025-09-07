import React from 'react';

interface StackProps {
  diskCount: number;
  isSelected: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

const Disk: React.FC<{ index: number }> = ({ index }) => {
  const colorClasses = ['bg-cyan-400', 'bg-cyan-500', 'bg-teal-400', 'bg-teal-500'];
  const color = colorClasses[index % colorClasses.length];
  
  return (
    <div
      className={`h-3 md:h-4 w-16 md:w-20 rounded-full ${color} shadow-md border-b-2 border-black/20`}
      style={{
        transform: `translateY(${index * 2}px)`,
        filter: `brightness(${1 - index * 0.05})`,
      }}
    />
  );
};

const Stack: React.FC<StackProps> = ({ diskCount, isSelected, onClick, isDisabled }) => {
  const disks = Array.from({ length: diskCount }, (_, i) => i);

  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      className={`relative flex flex-col-reverse items-center p-2 rounded-t-lg transition-all duration-300
        ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-slate-700/50'}
        ${isSelected ? 'bg-cyan-400/20' : ''}`
      }
      style={{ minHeight: '180px', minWidth: '100px' }}
    >
      <div className={`absolute -top-6 text-sm font-bold p-1 px-2 rounded-md ${isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
        {diskCount}
      </div>
      {diskCount > 0 ? (
        <div className="flex flex-col-reverse space-y-[-10px] md:space-y-[-12px]">
          {disks.map(i => <Disk key={i} index={i} />)}
        </div>
      ) : (
        <div className="absolute bottom-4 text-4xl text-slate-600">Ø</div>
      )}
      <div className="absolute bottom-0 w-24 md:w-28 h-2 bg-slate-600 rounded-full" />
    </div>
  );
};

export default Stack;
