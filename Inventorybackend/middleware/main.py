# from django.http import QueryDict


class ExampleMiddleware :
    def __init__(self, get_response):
        self.get_response = get_response
        print("Iam Middleware_init")
    def __call__(self, request, *args , **kwads):
        # print("Iam Middleware")
        # response = self.get_response(request)
        print("Middleware: Incoming Request")
        print("Request Method:", request.method)
        print("Request Path:", request.path)
        print("Request Headers:", request.headers)
       
        response = self.get_response(request)
        print("end" ,"sdsds")
        return response
        
#         # This code runs after the view is called, but before the response is sent
#         print("Middleware: Outgoing Response")
#         print("Response Status Code:", response.status_code)
#         print("Response Content Type:", response['Content-Type'])

        # user_agent = request.META.get("HTTP_USER_AGENT")
        # request_url = request.build_absolute_uri()
        # print("Request URL:", request_url) 
        # Extract query parameters
        # print(user_agent)
        # Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69
    
        # path_segments = request.path.split('/')
        # print("Path Segments:", path_segments)
         # Request URL: http://127.0.0.1:8000/api/fetchinventory/?role=Store%20Manager
        # print(response)
        #<JsonResponse status_code=200,"application/json">
        # return response
    

     


class BaseTestMiddleware:
    def __init__(self , get_response):
        self.get_response = get_response


    def __call__(self, request):
        print("start" , self.middleware_name)
        response = self.get_response(request)
     
        print("End", self.middleware_name)
        # print(response)

        return response


class TestMiddleware(BaseTestMiddleware):
    middleware_name =  "First Middleware"

class TestMiddleware2(BaseTestMiddleware):
    middleware_name = "second Middlewarename"

class TestMiddleware3(BaseTestMiddleware):
    middleware_name = "Trird Middlewarename"





