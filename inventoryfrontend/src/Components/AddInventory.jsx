import React, { useState } from 'react'

const AddInventory = () => {

    const[productname , PickProductname] = useState("")
    const[vendor , PickVendor] = useState("")
    const[mrp , PickMrp] = useState("")
    const[batchnum , PickBatchnum] = useState("")
    const[batchdate , PickBatchdate] = useState("")
    const[quantity , PickQuantity] = useState("")



    const AddInventory = () =>{
        let input = {
            product_name: productname,
            vendor : vendor,
            mrp : mrp.toString(),
            batch_num  :batchnum,
            quantity : quantity,
            batch_date : batchdate,
            role : localStorage.getItem("role")
        }
        let requestOption = {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body : JSON.stringify(input)
        }
        fetch("http://127.0.0.1:8000/api/addinventory/",requestOption)
        .then(response => response.json())
        .then(data => {
            if("success"){
                alert("Inventory Added Successfully..") 
            }else{
                alert('Error in Adding Inventory')
            }
        })
    }



  return (
    <div className='addinventory-div'>
        <h2>AddInventory</h2>

        <div>
            <form action="">
                <input type="text" onChange={obj => PickProductname(obj.target.value)} placeholder='Product name' required />
                <br />
                <input type="text" onChange={obj => PickVendor(obj.target.value)} placeholder='Vendor' required />
                <br />
                <input type="text" onChange={obj => PickMrp(obj.target.value)} placeholder='MRP' required />
                <br />
                <input type="text" onChange={obj => PickBatchnum(obj.target.value)} placeholder='Batch Num' required />
                <br />
                <input type="date" onChange={obj => PickBatchdate(obj.target.value)} placeholder='Batch Date' required  />
                <br />
                <input type="text" onChange={obj => PickQuantity(obj.target.value)} placeholder='Quantity(Stock on Hand)' required />

                <button type="submit" onClick={AddInventory}>Add</button>

            </form>
        </div>



    </div>
  )
}

export default AddInventory