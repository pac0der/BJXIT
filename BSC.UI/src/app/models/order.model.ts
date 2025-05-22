export interface OrderItemRequestDto {
    productId: number;
    quantity: number;
}

export interface OrderRequestDto {
    customerName: string;
    items: OrderItemRequestDto[];
}

export interface OrderItemResponseDto {
    productId: number;
    productName: string;
    quantity: number;
}

export interface OrderResponseDto {
    id: number;
    customerName: string;
    orderDate: string;
    items: OrderItemResponseDto[];
}
