from .serializers import UserSerializer, LoginSerializer, RegisterSerializer
from rest_framework import generics
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],  # creates token specific to given user
        })
    
class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)