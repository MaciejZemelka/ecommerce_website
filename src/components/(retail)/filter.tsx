import { stringify } from "querystring";
import { useState } from "react";

export default function FilterSideBar({ filters, onFilterChange }: { filters: FiltersArrayProps; onFilterChange: (filters: any) => void }) {


  const [selectedFilters, setSelectedFilters] = useState<{
    sizes: number[];
    colors: string[]; 
    genders: string[];
    heights: string[];
  }>({
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



  const handleFilterChange = (value: string | number, category: keyof typeof selectedFilters, isChecked: boolean) => {
    const updatedFilters = {
      ...selectedFilters,
      [category]: isChecked
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
        {Object.keys(filters).map((filterCategory) => (
          <div key={filterCategory} className="border-t-[1px] border-grey px-2 py-5 space-y-2 ">
            <label
              onClick={() => toggleSection(filterCategory as keyof typeof selectedFilters)}
              className="flex items-center cursor-pointer"
            >
              <span className="capitalize font-bold">{filterCategory}</span>
              <span
                className={`ml-2 text-[25px] relative transition-transform duration-300 ${visibleSections[filterCategory as keyof typeof visibleSections] ? "rotate-180 bottom-[5px]" : "rotate-0 top-[7px]"
                  }`}
              >
                ^
              </span>
            </label>
            {visibleSections[filterCategory as keyof typeof visibleSections] && (
              <div >
                {filterCategory == 'sizes' && (
                  <div className="grid grid-cols-3 gap-1 w-full">
                    {filters[filterCategory as keyof typeof filters]?.map((item, index) => {
                      const isChecked = selectedFilters.sizes.includes(item as number);
                      return (
                        <button
                          value={item}
                          className={`border-2 w-full p-2 ${isChecked ? 'border-black' : ''} hover:border-black ${item == 50 ? 'col-span-3' : ''}`}
                          style={{ background: item }}
                          onClick={() => handleFilterChange(item, filterCategory as keyof typeof selectedFilters, !isChecked)}>
                          {item}
                        </button>

                      )

                    })}
                  </div>
                )}
                {filterCategory == 'colors' && (
                  <div className="grid grid-cols-3">
                    {filters[filterCategory as keyof typeof filters]?.map((item, index) => {

                      const isChecked = selectedFilters.colors.includes(item as string);


                      return (
                        <div key={index}>
                          <button
                            value={item}
                            className={`border-[2px] w-[40px] h-[40px] rounded-full  ${isChecked ? 'border-black' : ''} hover:border-[3px] border-grey`}
                            style={{ background: item }}
                            onClick={() => handleFilterChange(item, filterCategory as keyof typeof selectedFilters, !isChecked)} />
                        </div>
                      );
                    })}
                  </div>
                )}
                {(filterCategory == 'genders' || filterCategory == 'heights') && (
                  <div className="space-y-2">
                    {filters[filterCategory as keyof typeof filters]?.map((item, index) => {
                      let isChecked = false;
                      if (filterCategory == 'genders') {
                        isChecked = selectedFilters.genders.includes(item as string);
                      }
                      else {
                        isChecked = selectedFilters.heights.includes(item as string);
                      }

                      return (
                        <button
                          value={item}
                          className={`border-2 w-full p-2 ${isChecked ? 'border-black' : ''} hover:border-black`}
                          style={{ background: item }}
                          onClick={() => handleFilterChange(item, filterCategory as keyof typeof selectedFilters, !isChecked)}>
                          {item}
                        </button>

                      )

                    })}
                  </div>
                )}

              </div>
            )}
          </div>
        ))}
      </div>
  );
}
