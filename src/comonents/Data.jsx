function Data({ data,removeDataItem,index }) {
  return (
    <li className="list-group-item textAndBtn">
      
      <div className="text-item">
        {data}
      </div>

      <div className="group-btns">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" className="btn btn-danger" onClick={()=>{removeDataItem(index)}}>
            Delete
          </button>
          <button type="button" className="btn btn-success">
            Copy
          </button>
        </div>
      </div>
    </li>
  );
}

export default Data;
