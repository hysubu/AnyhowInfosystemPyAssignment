import React, { useEffect, useState } from 'react'

const ViewInventory = () => {
  const [allinventory, setAllinventory] = useState([])
  const [productname, PickProductname] = useState("")
  const [vendor, PickVendor] = useState("")
  const [mrp, PickMrp] = useState("")
  const [batchnum, PickBatchnum] = useState("")
  const [batchdate, PickBatchdate] = useState("")
  const [quantity, PickQuantity] = useState("")
  const[editid, PickEditId] = useState()
  const[status,Setstatus] = useState("")



  // This function display the all Inventory data 
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
        alert(data.message)
        console.log(all_inventory)
        setAllinventory(all_inventory);

      })
  }





// If Store manager or Department manager want to delete Inventory this function is work 

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






  //When Store manager want to Approved the Inventory data this funtion is work  


  const Approve_store_manager = (n) => {
    alert(status)
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



// If Department manager want to Edit Inventory this function is edited the data 

//  If The Inventory Status is Approved then the invetory will be access update 
// When Department manager want  to update after updated  the inventory status will be Pending again 


  const EditItem_Department_manager = () =>{
    let input  = {
      product_name: productname,
      vendor : vendor,
      mrp : mrp.toString(),
      batch_num  :batchnum,
      quantity : quantity,
      batch_date : batchdate,
      role : localStorage.getItem("role"),
      edit_id : editid
    }

    let requestOption = {
      method:'PUT',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify(input)}
    fetch("http://127.0.0.1:8000/api/changeinventory/", requestOption)
    .then(response => response.json())
    .then(data=>{
      if(data.success  == true){
        alert(data.message)
      }else{
        alert(data.message)
      }
    })
  }
  
  

// This fucntion display the Edit inventory data 
  const EditItem_fetch_data = (id) =>{
    let input = {
      role : localStorage.getItem("role"),
      item_id : parseInt(id)
    }
    let requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json'},
      body: JSON.stringify(input)
    }
    try {
      fetch("http://127.0.0.1:8000/api/fetcheditinventory/", requestOption)
      .then(response => response.json())
      .then(data=>{
        console.log(data)
        console.log(data.data)
        if(data.success == true){
          PickProductname(data.data.product_name)
          PickVendor(data.data.vendor)
          PickBatchnum(data.data.batch_num)
          PickBatchdate(data.data.batch_date)
          PickMrp(data.data.mrp)
          PickQuantity(data.data.quantity)
          PickEditId(data.data.id)
          handleViewInventory()

        }else{
          alert(data.message)
        }
      })
    
    .catch(error =>{
      console.error("An error occurred:", error);
      // Handle the error gracefully, e.g., show an error message to the user.
      alert("An error occurred while fetching data.");
    })
  }catch(error){
    console.error("An error occurred:", error);
    // Handle the error gracefully, e.g., show an error message to the user.
    alert("An error occurred while processing the request.");
  }

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
                          <select name="" value={item.fields.status} id="" onChange={(e) => Approve_store_manager(item.pk,e.target.value)}> {item.fields.status}
                          {/* <option value="">{item.fields.status}</option> */}
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
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
                          <button onClick={DeleteItem.bind(null,item.pk)}>Delete</button>
                          { item.fields.status == "Approved" ?(
                              <button onClick={EditItem_fetch_data.bind(null,item.pk)}>Edit</button>
                          ):(
                          <></>
                          )
                          }
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


{ localStorage.getItem("role") == "Department Manager"?(
  
  <div className='Edit-form'>
    <h2>Update Inventory</h2>
      <form action="">
        <input type="text" value={productname} onChange={obj => PickProductname(obj.target.value)} placeholder='Product name' />
        <br />
        <input type="text" value={vendor}  onChange={obj => PickVendor(obj.target.value)} placeholder='Vendor' />
        <br />
        <input type="text" value={mrp}  onChange={obj => PickMrp(obj.target.value)} placeholder='MRP' />
        <br />
        <input type="text" value={batchnum} onChange={obj => PickBatchnum(obj.target.value)} placeholder='Batch Num' />
        <br />
        <input type="date" value={batchdate} onChange={obj => PickBatchdate(obj.target.value)} placeholder='Batch Date' />
        <br />
        <input type="text" value={quantity} onChange={obj => PickQuantity(obj.target.value)} placeholder='Quantity(Stock on Hand)' />
        <button type="submit" onClick={EditItem_Department_manager}>Update</button>    

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