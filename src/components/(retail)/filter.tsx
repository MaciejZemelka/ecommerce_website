import { useState } from "react";

export default function FilterSideBar({ filters, onFilterChange }: { filters: FiltersArrayProps; onFilterChange: (filters: any) => void }) {
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [],
    colors: [],
    genders: [],
    heights: [],
  });

  const [visibleSections, setVisibleSections] = useState({
    sizes: false,
    colors: false,
    genders: false,
    heights: false,
  });



  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, category: keyof typeof selectedFilters) => {
    const { value, checked } = e.target;
    const updatedFilters = {
      ...selectedFilters,
      [category]: checked
        ? [...selectedFilters[category], value]
        : selectedFilters[category].filter((item) => item !== value),
    };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters); 
  };
  const toggleSection = (section: keyof typeof selectedFilters) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-[200px] text-left mx-2">
      <h2 className="px-2">Filters</h2>

      {Object.keys(filters).map((filterCategory) => (
        <div key={filterCategory} className="border-t-[1px] border-black p-2">
          <label onClick={() => toggleSection(filterCategory as keyof typeof selectedFilters)}>
            {filterCategory} {visibleSections[filterCategory as keyof typeof visibleSections] ? "▲" : "▼"}
          </label>
          {visibleSections[filterCategory as keyof typeof visibleSections] && (
            <div>
              {filters[filterCategory as keyof typeof filters]?.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    value={item}
                    onChange={(e) => handleFilterChange(e, filterCategory as keyof typeof selectedFilters)}
                  />
                  <label>{item}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
