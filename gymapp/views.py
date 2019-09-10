from django.http import Http404
from rest_framework.views import APIView # get the APIView class from DRF
from rest_framework.response import Response # get the Response class from DRF
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly



from .models import Item, Programme, Category, Exercise
from .serializers import ItemSerializer, ProgrammeSerializer, PopulatedProgrammeSerializer, CategorySerializer, PopulatedCategorySerializer, ExerciseSerializer

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



# class ItemDetailView(APIView):
#
#
#     def get_item(self, pk):
#         try:
#             item = Item.objects.get(pk=pk)
#         except Item.DoesNotExist:
#             raise Http404
#
#         return item
#
#     def get(self, _request, pk):
#         item = self.get_item(pk) # get a item by id (pk means primary key)
#         serializer = ItemSerializer(item)
#
#         # pass the item to the template file
#         return Response(serializer.data) # send the JSON to the client
#
#     # To EDIT
#     def put(self, request, pk):
#         item = self.get_item(pk)
#         serializer = ItemSerializer(item, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#
#         return Response(serializer.errors, status=422)
#
# # To DELETE
#     def delete(self, _request, pk):
#         item = self.get_item(pk)
#         item.delete()
#
#         return Response(status=204)





class ProgrammeListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):


        programmes = Programme.objects.filter(user=request.user) # get all the items
        serializer = PopulatedProgrammeSerializer(programmes, many=True)
        return Response(serializer.data) # send the JSON to the client


    # handle to CREATE
    def post(self, request):
        serializer = ProgrammeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            programme = serializer.instance
            serializer = PopulatedProgrammeSerializer(programme)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)



class ProgrammeDetailView(APIView):
    permission_classes = (IsOwnerOrReadOnly,)

    def get_programme(self, pk):
        try:
            programme = Programme.objects.get(pk=pk)
        except Programme.DoesNotExist:
            raise Http404

        return programme


    def get(self, _request, pk):
        programme = self.get_programme(pk) # get a item by id (pk means primary key)
        serializer = PopulatedProgrammeSerializer(programme)

        # pass the item to the template file
        return Response(serializer.data) # send the JSON to the client

    # To EDIT
    def put(self, request, pk):
        programme = self.get_programme(pk)
        serializer = ProgrammeSerializer(programme, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

# To DELETE
    def delete(self, _request, pk):
        programme = self.get_programme(pk)
        programme.delete()

        return Response(status=204)


# /api/programmes/:id/items
class ProgrammeItemListView(APIView):

    def get_programme(self, pk):
        try:
            programme = Programme.objects.get(pk=pk)
        except Programme.DoesNotExist:
            raise Http404

        return programme


    def post(self, request, pk):
        programme = self.get_programme(pk)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(programme=programme)# this attaches items to a particular programme
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)



# /api/programmes/:id/items/:id
class ProgrammeItemDetailView(APIView):

    def get_item(self, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise Http404

        return item

    def put(self, request, **kwargs):
        item = self.get_item(kwargs['pk'])
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()# this attaches a particular item to a particuar programme
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


    def delete(self, _request, pk):
        item = self.get_item(pk)
        item.delete()

        return Response(status=204)




class CategoryListView(APIView):

    def get(self, _request):
        categories = Category.objects.all() # get all the items
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data) # send the JSON to the client


    # handle to CREATE
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)



class CategoryDetailView(APIView):

    def get_category(self, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

        return category


    def get(self, _request, pk):
        category = self.get_category(pk) # get a item by id (pk means primary key)
        serializer = CategorySerializer(category)

        # pass the item to the template file
        return Response(serializer.data) # send the JSON to the client

    # To EDIT
    def put(self, request, pk):
        category = self.get_category(pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

# To DELETE
    def delete(self, _request, pk):
        category = self.get_category(pk)
        category.delete()

        return Response(status=204)




class ExerciseListView(APIView):

    def get(self, _request):
        exercises = Exercise.objects.all() # get all the items
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data) # send the JSON to the client


    # handle to CREATE
    def post(self, request):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)



class ExerciseDetailView(APIView):

    def get_exercise(self, pk):
        try:
            exercise = Exercise.objects.get(pk=pk)
        except Exercise.DoesNotExist:
            raise Http404

        return exercise


    def get(self, _request, pk):
        exercise = self.get_exercise(pk) # get a item by id (pk means primary key)
        serializer = ExerciseSerializer(exercise)

        # pass the item to the template file
        return Response(serializer.data) # send the JSON to the client

    # To EDIT
    def put(self, request, pk):
        exercise = self.get_exercise(pk)
        serializer = ExerciseSerializer(exercise, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)

# To DELETE
    def delete(self, _request, pk):
        exercise = self.get_exercise(pk)
        exercise.delete()

        return Response(status=204)
