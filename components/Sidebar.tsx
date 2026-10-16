import SearchForm from "./SearchForm";

export default function Sidebar({ searchId = "search-form-3", value }: { searchId?: string; value?: string }) {
  return (
    <aside id="secondary" className="widget-area" aria-label="Боковая панель блога">
      <section id="search-3" className="widget widget_search">
        <h2 className="widget-title">Поиск</h2>
        <SearchForm id={searchId} value={value} />
      </section>
    </aside>
  );
}
