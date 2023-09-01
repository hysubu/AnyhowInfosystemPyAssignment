from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
import json
from cryptography.fernet import Fernet
from .models import *
from .utils import passwordhash
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from datetime import datetime
from django.core import serializers

# Create your views here.


#  User SignUp API  
@csrf_exempt
@api_view(["POST"])
def signup(request):  
    try:   
        data = request.data
        username = User.objects.filter(username = data["username"])
        email = User.objects.filter(username = data["email"])
        if username.exists():
            return JsonResponse({'success': False, 'message': 'Username already Exists',}, status=400)
        elif email.exists():
            return JsonResponse({'success': False,"message":"Email already exists"} , status=400)
        elif data["password"] == "":
            return JsonResponse({"success":False , "message":"Password required"})
        else:
            password_hash =  passwordhash(password=data["password"])
            print(password_hash["password"])
            User(
            username=data['username'],
            email = data["email"],
            password_key = password_hash["passwordkey"],
            password = password_hash["password"]
            ).save()
            return JsonResponse({'success': False,"message":"Regestration Successfull"} , status=201)
    except Exception as e :
        return JsonResponse({'success': False, 'message': 'An error occurred', 'error': str(e)}, status=500)




# User Login API 
@csrf_exempt
@api_view(["POST"])
def login(request):
    data = request.data 
    try:
        username = data["username"]
        password = data["password"]
        fil_user_name = User.objects.filter(username = username)
        if fil_user_name.exists():
            if len(fil_user_name) == 1 :
                get_data_from_db = fil_user_name.values("password_key", "password","role")[0]
                get_password_key_from_dict = get_data_from_db["password_key"]
                get_password_from_dict =  get_data_from_db["password"]
                fernet = Fernet(get_password_key_from_dict)
                decrept_password =  fernet.decrypt(get_password_from_dict).decode()
                if password == decrept_password :
                    role_id = get_data_from_db["role"]
                    role = Role.objects.get(id=role_id)
                    return JsonResponse({'success': True, 'message': 'Login successfully',"role":role.role })
                else:
                    return JsonResponse({"success": False , "message":"Invalid password"}, status = 400)
        else :
            return JsonResponse({"success":False, "message":"username invalid"})
    except Exception as e :
        return JsonResponse({"success": False, "message": str(e)}, status=500)



# Inventory Creating API
@csrf_exempt
@api_view(["POST"])
def addinventory(request):
    try : 
        data = request.data 
        batch_data = datetime.strptime(data["batch_date"], '%Y-%m-%d').date()
        print(batch_data)
        print(data["role"])
        if data["role"] == "Department Manager" :
            print(data["role"])
            try :
                InventoryRecord(
                    product_name = data["product_name"], 
                    vendor = data["vendor"],
                    mrp = data["mrp"], 
                    batch_num = data["batch_num"],
                    quantity = data["quantity"],
                    batch_date = batch_data
                ).save()
                return JsonResponse({"success":True, "message":"Inventory Added Successfully!"},status = 201)
            except Exception as e :
                return JsonResponse({"success": False, "message": str(e)}, status=500)
        elif  data["role"] == "Store Manager" :
            print(data["role"])
            InventoryRecord(
                product_name = data["product_name"], 
                vendor = data["vendor"],
                mrp = data["mrp"], 
                batch_num = data["batch_num"],
                quantity = data["quantity"],
                batch_date = batch_data,
                status = "Approved"
            ).save()
            return JsonResponse({"success":True , "message":"Succesfull Added"}, status= 201)
        else :
            return JsonResponse({"success": False, "message": "Invalid role"}, status=400)
    except Exception as e :
        return JsonResponse({"success": False, "message": str(e)}, status=500)
    



# Fetch Inventory Data  API
@csrf_exempt
@api_view(["GET"])
def fetch_inventory(request):
    try :
        data = request.GET.get("role") 
        print("fetch", data)
        if data == "Department Manager" :
            print("data")
            all = InventoryRecord.objects.filter(delete = False)
            print(all)
            all_inventory = InventoryRecord.objects.filter(delete = False) 
            py_to_json_approved = serializers.serialize('json',all_inventory)
            return JsonResponse({"success":True, "message":"successfull fetching", "all_inventory":py_to_json_approved})
        elif data == "Store Manager":
            print("dataa")
            pending_inventory = InventoryRecord.objects.filter(delete=False) 
            py_to_json =  serializers.serialize('json', pending_inventory)
            print(py_to_json)
            return JsonResponse({"success":True, "message":"successfull fetching", "all_inventory":py_to_json })
        else:
            return JsonResponse({"success":False, "message":"No data Avilable" })
    except Exception as e :
        print(e)



# Approval API
@csrf_exempt
@api_view(["PUT"])
def approved_inventory(request):
    data = request.data
    try :
        if data["role"] == "Store Manager" :
            approval_inventory =  InventoryRecord.objects.filter(id = data["edit_item"])
            print(data["status"])
            if approval_inventory.exists():
                if len(approval_inventory) == 1 :
                    approval_inventory.update(
                        status = data["status"]
                    )
                    return JsonResponse({"success":True , "message":"Approval Successfull"})
        else:
            return JsonResponse({"success": False, "message": "Invalid role"}, status=400)
    except KeyError as e:
        return JsonResponse({"success": False, "message": f"Missing field: {e}"}, status=400)
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)
        




#fetching Edit  Inventory data 

@api_view(["POST"])
def fetch_edit_inventory(request):
    try :
        data = request.data
        if data["role"] == "Department Manager":
            print("hello")
            get_inventory = InventoryRecord.objects.get(id = data["item_id"])
            print(get_inventory)
            inventory_data = {
                "id": get_inventory.id,
                "product_name": get_inventory.product_name,
                "vendor": get_inventory.vendor,
                "mrp": get_inventory.mrp,
                "batch_num": get_inventory.batch_num,
                "quantity": get_inventory.quantity,
                "batch_date": get_inventory.batch_date,  # Convert date to string
                "status": get_inventory.status,
                # Add more attributes as needed
            }
            return JsonResponse({"success": True, "message": "Data fetched successfully", "data": inventory_data})
        else:
            return JsonResponse({"success": False, "message": "Invalid role"}, status=400)
    except InventoryRecord.DoesNotExist:
        return JsonResponse({"success": False, "message": "Inventory not found"}, status=404)
    except KeyError as e:
        return JsonResponse({"success": False, "message": f"Missing field: {e}"}, status=400)
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)

    




# Edit Inventory API for Department Manager 
@api_view(["PUT"])
def change_Inventory(request):
    try :
        data = request.data 
        if data["role"] == "Department Manager":
            filter_indentory =  InventoryRecord.objects.filter(id = data["edit_id"])
            if filter_indentory.exists():
                try :
                    batch_data = datetime.strptime(data["batch_date"], '%Y-%m-%d').date()
                    print(batch_data)
                    filter_indentory.update(
                        product_name = data["product_name"], 
                        vendor = data["vendor"],
                        mrp = data["mrp"], 
                        batch_num = data["batch_num"],
                        quantity = data["quantity"],
                        batch_date = batch_data,
                        status = "Pending"
                    )
                    return JsonResponse({"success":True, "message" :"Successfuly Updated"})
                except ValueError :
                    return JsonResponse({"success": False, "message": "Invalid date format"}, status=400)
            else :
                return JsonResponse({"success": False, "message": "Inventory not found"}, status=404)
        else:
            return JsonResponse({"success": False, "message": "Invalid role"}, status=400)
    except KeyError as e:
        return JsonResponse({"success": False, "message": f"Missing field: {e}"}, status=400)
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)



   

# DELETE Inventory API 

@api_view(["DELETE"])
def delete_inventory(request):
    try :
        data = request.data 
        if data["role"] == "Department Manager" :
            filter_inventory = InventoryRecord.objects.filter(id = data["delete_item_id"])
            if filter_inventory.exists():
                filter_inventory.update(
                    delete = True 
                )
                return JsonResponse({"success":True, "message":"Successfully "})
        elif data["role"] == "Store Manager":
            filter_inventory = InventoryRecord.objects.filter(id = data["delete_item_id"])
            if filter_inventory.exists():
                filter_inventory.update(
                    delete = True
                )
                return JsonResponse({"success":True,"message":"Inventory Deleted"})
        else :
            return JsonResponse({"success": False, "message": "Invalid role"}, status=400)
    except KeyError  as e :
            return JsonResponse({"success": False, "message": f"Missing field: {e}"}, status=400)
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)
    



            


    
    



    


    
    




    

                
               

            




















            

       
      
