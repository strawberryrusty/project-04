from django.http import Http404
from rest_framework.views import APIView # get the APIView class from DRF
from rest_framework.response import Response # get the Response class from DRF
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly



from .models import Item, Programme, Category
from .serializers import ItemSerializer, ProgrammeSerializer, PopulatedProgrammeSerializer, CategorySerializer, PopulatedCategorySerializer

# Create your views here.

class ItemListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        items = Item.objects.all() # get all the items
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data) # send the JSON to the client


    # handle to CREATE
    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)# if a user adds a album
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)



class ItemDetailView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_item(self, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise Http404

        return item

    def get(self, _request, pk):
        item = self.get_item(pk) # get a item by id (pk means primary key)
        serializer = ItemSerializer(item)

        # pass the item to the template file
        return Response(serializer.data) # send the JSON to the client

    # To EDIT
    def put(self, request, pk):
        item = self.get_movie(pk)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

# To DELETE
    def delete(self, _request, pk):
        item = self.get_item(pk)
        item.delete()

        return Response(status=204)





class ProgrammeListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)


    def get(self, _request):
        programmes = Programme.objects.all() # get all the items
        serializer = PopulatedProgrammeSerializer(programmes, many=True)
        return Response(serializer.data) # send the JSON to the client


    # handle to CREATE
    def post(self, request):
        serializer = ProgrammeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)



class ProgrammeDetailView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_item(self, pk):
        try:
            programme = Programme.objects.get(pk=pk)
        except Programme.DoesNotExist:
            raise Http404

        return programme


    def get(self, _request, pk):
        programme = self.get_item(pk) # get a item by id (pk means primary key)
        serializer = PopulatedProgrammeSerializer(programme)

        # pass the item to the template file
        return Response(serializer.data) # send the JSON to the client

    # To EDIT
    def put(self, request, pk):
        programme = self.get_item(pk)
        serializer = ItemSerializer(programme, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

# To DELETE
    def delete(self, _request, pk):
        programme = self.get_item(pk)
        programme.delete()

        return Response(status=204)





class CategoryListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)


    def get(self, _request):
        categories = Category.objects.all() # get all the items
        serializer = PopulatedCategorySerializer(categories, many=True)
        return Response(serializer.data) # send the JSON to the client


    # handle to CREATE
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)



class CategoryDetailView(APIView):



    def get_item(self, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

        return category


    def get(self, _request, pk):
        category = self.get_item(pk) # get a item by id (pk means primary key)
        serializer = PopulatedCategorySerializer(category)

        # pass the item to the template file
        return Response(serializer.data) # send the JSON to the client

    # To EDIT
    def put(self, request, pk):
        category = self.get_item(pk)
        serializer = ItemSerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

# To DELETE
    def delete(self, _request, pk):
        category = self.get_item(pk)
        category.delete()

        return Response(status=204)
