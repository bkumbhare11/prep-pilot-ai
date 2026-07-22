function StatsCard({ title, value, icon, color }) {
  return (
    <>
      <div className="bg-slate-900 flex items-center flex-1 w-full sm:min-w-96 border border-slate-800/80 gap-4 p-5 rounded-xl transition-all duration-300 hover:scale-[1.03]">
        <span className={`${color} text-2xl sm:text-4xl p-3.5 rounded-xl`}>
          {icon}
        </span>
        <div className="space-y-2">
          <p className="text-xl sm:text-3xl font-bold tracking-tight">
            {value}
          </p>
          <h4 className="text-slate-400 tracking-tight text-sm font-meduim">
            {title}
          </h4>
        </div>
      </div>
    </>
  );
}

export default StatsCard;
