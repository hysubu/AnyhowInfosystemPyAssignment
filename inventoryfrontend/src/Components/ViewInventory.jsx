import React, { useEffect, useState } from 'react'

const ViewInventory = () => {
  const [allinventory, setAllinventory] = useState([])
  const [productname, PickProductname] = useState("")
  const [vendor, PickVendor] = useState("")
  const [mrp, PickMrp] = useState("")
  const [batchnum, PickBatchnum] = useState("")
  const [batchdate, PickBatchdate] = useState("")
  const [quantity, PickQuantity] = useState("")

  const handleViewInventory = () => {
    let role = localStorage.getItem("role")
    let requestoptions = {
      method: 'GET',
      headers: { "Content-type": "application/json" },
    }
    fetch(`http://127.0.0.1:8000/api/fetchinventory/?role=${role}`, requestoptions)
      .then(response => response.json())
      .then(data => {
        let all_inventory = JSON.parse(data.all_inventory)
        console.log(all_inventory)
        setAllinventory(all_inventory);

      })
  }







  const DeleteItem = (n) => {
    let input = {
      delete_item_id: parseInt(n),
      role: localStorage.getItem("role")
    }
    let requestOption = {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(input)
    }

    fetch("http://127.0.0.1:8000/api/deleteinventory/", requestOption)
      .then(response => response.json())
      .then(data => {
        if (data.success == true) {
          alert(data.message)
          handleViewInventory()
        }
        else {
          alert(data.message)
          handleViewInventory()
        }
      })

  }






  // Approval Edit  

  const Approve_store_manager = (n) => {
    let input = {
      edit_item: n,
      status: "Approved",
      role: localStorage.getItem("role")
    }
    let requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(input)
    }
    fetch("http://127.0.0.1:8000/api/updateinventory/", requestOption)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message)
          handleViewInventory()
        }
        else {
          alert(data.message)
          handleViewInventory()
        }
      })
  }

  useEffect(() => {
    handleViewInventory()
  }, [1])




  const EditItem_Department_manager = () =>{
    let input  = {
      product_name: productname,
      vendor : vendor,
      mrp : mrp.toString(),
      batch_num  :batchnum,
      quantity : quantity,
      batch_date : batchdate,
      role : localStorage.getItem("role")
    }
  }



  const EditItem_fetch_data = (id) =>{
    let input = {
      role : localStorage.getItem("role"),
      item_id : id
    }
    let requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON'},
      body: JSON.stringify(input)
    }
    fetch("", requestOption)
    .then(response => response.json())
    .then(data=>{
      if(data.success == true){
        alert(data.message)
      }else{
        alert(data.message)
      }
    })

    
  } 




  return (
    <div className='view-inventory-div'>
      <h2>Pending Inventory</h2> <button>{localStorage.getItem("role")}</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ITEM</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              allinventory.map((item, index) => {
                if (localStorage.getItem("role") == "Store Manager") {
                  return (
                    <>
                      <tr>
                        <td>{index}</td>
                        <td>{item.fields.product_name}</td>
                        <td>
                          <select name="" id="" onChange={(e) => Approve_store_manager(item.pk, e.target.value)}> {item.fields.status}
                            <option value="Pending">Pending</option>
                            <option value="Approved" >Approved</option>
                          </select>
                        </td>
                        <td>
                          <button onClick={DeleteItem.bind(null, item.pk)}>Delete</button>
                        </td>
                      </tr>
                    </>
                  )
                } else {
                  return (
                    <>
                      <tr>
                        <td>{index}</td>
                        <td>{item.fields.product_name}</td>
                        <td>{item.fields.status}</td>
                        <td>
                          <button onClick={DeleteItem.bind(null, item.pk)}>Delete</button>
                          <button onClick={EditItem_Department_manager.bind(null, item.pk)}>Edit</button>
                        </td>
                      </tr>
                    </>
                  )
                }
              })
            }
          </tbody>
        </table>
      </div>


{ localStorage.getItem("role") == "Department Manager" ? (
  <div className='Edit-form'>
      <form action="">
        <input type="text" onChange={obj => PickProductname(obj.target.value)} placeholder='Product name' />
        <br />
        <input type="text" onChange={obj => PickVendor(obj.target.value)} placeholder='Vendor' />
        <br />
        <input type="text" onChange={obj => PickMrp(obj.target.value)} placeholder='MRP' />
        <br />
        <input type="text" onChange={obj => PickBatchnum(obj.target.value)} placeholder='Batch Num' />
        <br />
        <input type="date" onChange={obj => PickBatchdate(obj.target.value)} placeholder='Batch Date' />
        <br />
        <input type="text" onChange={obj => PickQuantity(obj.target.value)} placeholder='Quantity(Stock on Hand)' />
        <button type="submit" onClick={EditItem_Department_manager}>Add</button>

      </form>
      </div>
):(
  <></>
)
}
    </div>
  )
}

export default ViewInventory