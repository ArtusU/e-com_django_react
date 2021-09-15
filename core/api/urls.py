from django.urls import path
from .views import (
    ItemListView,
    AddToCartView
)


urlpatterns = [
    path('product-list/', ItemListView.as_view(), name='product-list'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart')
]
