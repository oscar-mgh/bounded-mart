import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { Order } from '../../../domain/entities/order.entity';
import { OrderItem } from '../../../domain/value-objects/order-item.vo';
import { OrderDocument } from '../schemas/order.schema';

export class OrderMapper {
  static toDomain(doc: OrderDocument): Order {
    const items = doc.items.map((i) => new OrderItem(i.productId, i.productName, i.unitPrice, i.quantity));

    return new Order(Id.create(doc._id.toString()), doc.customerId, items, doc.status as any, new Date(doc.createdAt));
  }

  static toPersistence(order: Order) {
    return {
      _id: order.id.getValue(),
      customerId: order.getCustomerId(),
      items: order.getItems().map((i) => ({
        productId: i.getProductId(),
        productName: i.getProductName(),
        unitPrice: i.getUnitPrice(),
        quantity: i.getQuantity(),
      })),
      status: order.getStatus(),
      totalAmount: order.getTotalAmount(),
    };
  }
}
