import React from 'react'

export default function addProduct() {
  return (
    <div className="min-h-screen p-6 bg-[#F5f5dc] flex items-center justify-center">
  <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">Add Product</h2>
      <p className="text-gray-500 mb-6"></p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Product Details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
            <form method='post' className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="full_name">Product Name</label>
                <input type="text" name="name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="desc">Product Description</label>
                <textarea type="text" name="description" id="desc" rows="5" className="border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="Your Product Description here" />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="mrp">MRP</label>
                <input type="text" name="mrp" id="mrp" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="" />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="password">Price</label>
                <input type="text" name="price" id="price" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="" />
              </div>

              

              
              <div className="md:col-span-3">
                <label htmlFor="category">Category</label>
                <select name="category" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                  <option value="Male" >Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>


              <div className="md:col-span-3">
                <label htmlFor="stock_quantity">Stock Quantity</label>
                <input type="text" name="stock_quantity" id="stock_quantity" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="" />
              </div>


              <div className="md:col-span-2">
                <label htmlFor="role">Role</label>
                <select name="role" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                  <option value="Customer" >Customer</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>

              
                <div className="md:col-span-5">
                  <label htmlFor="store_name">Store Name</label>
                  <input type="text" name="store_name" id="store_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="Your Store Name Here..." />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="store_description">Store Description</label>
                  <textarea name="store_description" id="store_description" className="h-20 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="Your Store description Here..." />
                  
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="gst">GST Number</label>
                  <input type="text" name="gst" id="gst" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="Your GST Number Here..." />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="aadhar">Aadhar Number</label>
                  <input type="text" name="aadhar" id="aadhar" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="Your Aadhar Number Here..." />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="aadhar">Passport Size Image</label>
                  <input type="file" name="image" id="image" className="h-10 border mt-1 rounded px-4 p-2 w-full bg-gray-50" />
                </div>


              <div className="md:col-span-3">
                <label htmlFor="address">Address / Street</label>
                <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" placeholder="" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="country">Country / region</label>
                  <input name="country" id="country" placeholder="Country" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" />
                 
              </div>

              <div className="md:col-span-2">
                <label htmlFor="state">State / province</label>
                  <input name="state" id="state" placeholder="State" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue="" />
                  
                  
              </div>

              <div className="md:col-span-1">
                <label htmlFor="zipcode">Zipcode</label>
                <input type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" defaultValue="" />
              </div>

              

              
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  )
}