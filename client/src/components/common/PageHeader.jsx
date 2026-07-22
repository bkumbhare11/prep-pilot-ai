function PageHeader({ title, icon, subtitle, iconStyles }) {
  return (
    <div className="space-y-1">
      <h1 className=" text-2xl sm:text-3xl font-medium flex items-center gap-2 tracking-tight">
        {title}
        <span className={`${iconStyles} inline-block text-3xl`}>{icon}</span>
      </h1>
      <p className="text-slate-400 text-xs sm:text-sm">{subtitle}</p>
    </div>
  );
}

export default PageHeader;
