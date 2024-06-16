import rdb from 'rdb';

const map = rdb.map(x => {
    return {
        order: x.table('_order').map(v => {
            return {
                id: v.column('id').numeric().primary(), 
                orderDate: v.column('orderDate').date(),
                customerId: v.column('customerId').numeric()
            }
        }),

        orderLine: x.table('orderLine').map(v => {
            return {
                id: v.column('id').numeric().primary(),
                orderId: v.column('orderId').numeric(),
                product: v.column('product').string(),
                amount: v.column('amount').numeric()
            }
        }),

        deliveryAddress: x.table('deliveryAddress').map(v => {
            return {
                id: v.column('id').numeric().primary(),
                orderId: v.column('orderId').numeric(),
                postalPlace: v.column('postalPlace').string(),
            }
        }),

        customer: x.table('customer').map(v => {
            return {
                id: v.column('id').numeric().primary(),
                name: v.column('name').string(),
            }
        })
    }
}).map(x => {
    return {
        order: x.order.map(v => {
            return {
                deliveryAddress: v.hasOne(x.deliveryAddress).by('orderId'),
                customer: v.references(x.customer).by('customerId'),
                lines: v.hasMany(x.orderLine).by('orderId'),
            };

        })
    }
});

export default map;