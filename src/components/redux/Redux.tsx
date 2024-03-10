import React, {useMemo} from 'react'
import { useDispatch, Provider, useSelector } from 'react-redux';
import { store, selectSearch, setSearch, useAPI} from './Store';

function SearchBox() {
    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    
    return (
    <input
        className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-lg p-2"
        placeholder="Search"
        value={search}
        onChange={(e) => {
            dispatch(setSearch(e.target.value))
        }}
    />
  );
}


const ApiList = () => {
  const { data } = useAPI(undefined);
  console.log(data);
  
    const search = useSelector(selectSearch);

    const filterAndSort = useMemo(() => (
        (data || [])
            .filter((d) => d.name.toLowerCase().includes(search))
            .slice(0, 10)
            .sort((a,b) => a.name.localeCompare(b.name))
    ), [data, search]);
    
    return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-3">
      {(filterAndSort || []).map((d) => (
        <li
          key={d.id}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <img
              className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
              src={d.image_url}
              alt={d.name}
            />
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{d.name}</h3>
            <p className='mt-2 text-gray-900 text-xs font-medium'>
              {d.description}
            </p>
            <p className='mt-3 text-black text-sm'>Tips : {d.brewers_tips}</p>
            <p className='mt-3 text-black text-sm'>Contributer : {d.contributed_by}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};


const Redux = () => {
  return (
    <Provider store={store}>
      <div className="mx-auto">
        <SearchBox />
        <ApiList/>
      </div>
    </Provider>
  )
}

export default Redux