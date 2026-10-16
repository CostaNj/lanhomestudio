import Icon from "./Icon";

export default function SearchForm({ id, value = "" }: { id: string; value?: string }) {
  return (
    <form role="search" method="get" className="search-form" action="/">
      <label htmlFor={id}>
        <span className="screen-reader-text">Искать:</span>
      </label>
      <input
        type="search"
        id={id}
        className="search-field"
        placeholder="Поиск…"
        defaultValue={value}
        name="s"
      />
      <button type="submit" className="search-submit">
        <Icon name="search" />
        <span className="screen-reader-text">Поиск</span>
      </button>
    </form>
  );
}
