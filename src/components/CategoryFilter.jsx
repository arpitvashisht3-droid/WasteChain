import React from 'react';

const categories = [
  { id: 'All', label: 'All' },
  { id: 'Furniture', label: 'Furniture' },
  { id: 'Electronics', label: 'Electronics' },
  { id: 'Books', label: 'Books' },
  { id: 'Clothes', label: 'Clothes' },
  { id: 'Household', label: 'Household' },
  { id: 'Other', label: 'Other' }
];

export const CategoryFilter = ({ selectedCategory = 'All', onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
