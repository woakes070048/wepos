<template>
<div class="wepos-checkout-print-wrapper" v-if="settings.wepos_receipts">
<div>{{ sprintf("%17s",settings.wepos_receipts.receipt_header)}}</div>
<div>{{ sprintf("Order#%-8s %20s", printdata.order_id, formatDate( printdata.order_date ))}}</div>
<div>-----------------------------------</div>
<div v-for="item in printdata.line_items" v-bind:key="item.id">
<template v-if="item.on_sale">
<div>{{ sprintf("%-5s%-15s%15s",item.quantity, item.name, formatPrice( item.quantity*item.sale_price )) }}</div>
<div>{{ sprintf("Regular Price :%-15s",formatPrice( item.quantity*item.regular_price )) }}</div>
<div>{{ sprintf("**Sale Item**")}}</div>
</template>
<template v-else>
<div>{{ sprintf("%-5s%-15s%15s",item.quantity, item.name, formatPrice( item.quantity*item.regular_price )) }}</div>
</template>
<template v-if="item.attribute.length > 1"><div v-for="attribute_item in item.attribute" v-bind:key="attribute_item.name">{{ sprintf("   %-s:%-s", attribute_item.name.trim(), attribute_item.option )}}</div></template>
</div>
<div>-----------------------------------</div>
<template v-if="settings.woo_tax.wc_tax_display_cart == 'incl'"><div>{{ sprintf("%-12s%-12s%11s", __( 'Subtotal', 'wepos' ),  __( 'Includes Tax', 'wepos' ), formatPrice( $store.getters['Cart/getTotalLineTax'] )) }}</div></template>
<template v-else><div>{{ sprintf("%-12s%-12s%11s", __( 'Subtotal', 'wepos' ),  "", formatPrice( $store.getters['Cart/getTotalLineTax'] )) }}</div></template>
<div v-for="(fee,key) in printdata.fee_lines" class="cart-meta-data" v-bind:key="key">
<template v-if="fee.type=='discount'"><div>{{ sprintf("%-10s%-10s%15s", __( 'Discount', 'wepos' ) , fee.discount_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ), formatPrice( Math.abs( fee.total ) )) }}</div></template>
<template v-else><div>{{ sprintf("%-5s%-10s%-5s%15s", __( 'Fee', 'wepos' ), fee.name, fee.fee_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ), formatPrice( Math.abs( fee.total ) )) }}</div></template>
</div>
<template v-if="printdata.taxtotal"><div>{{ sprintf("%-12s%20s", __( 'Tax', 'wepos' ), formatPrice(printdata.taxtotal)) }}</div></template>
<template><div>{{ sprintf("%-15s%20s", __( 'Order Total', 'wepos' ).trim(), formatPrice(printdata.ordertotal)) }}</div></template>
<template><div>{{ sprintf("%-15s%20s", __( 'Payment method', 'wepos' ), printdata.gateway.title) }}</div></template>
<template v-if="printdata.gateway.id=='wepos_cash'">
<div>{{ sprintf("%-15s%20s", __( 'Paid Cash', 'wepos' ), formatPrice(printdata.cashamount)) }}</div>
<div>{{ sprintf("%-15s%20s", __( 'Change Amount', 'wepos' ), formatPrice(printdata.changeamount)) }}</div>
</template>
<template v-if="printdata.gateway.id=='wepos_shoplit'">
<div>-----------------------------------</div>
<div>{{ sprintf("%-15s%20s", __( 'Paid Card', 'wepos' ), formatPrice(printdata.cardamount)) }}</div>
<div>{{ sprintf("%-15s%20s", __( 'Auth Code', 'wepos' ), printdata.authcode) }}</div>
</template>
<div>-----------------------------------</div>
<div>{{ sprintf("%17s",settings.wepos_receipts.receipt_footer)}}</div>
</div>
</template>
<script>

export default {
    name: 'ReceiptPrintText',

    props: {
        printdata: {
            type: Object,
            default() {
                return {};
            }
        },
        settings: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        formatDate( date ) {
            var date = new Date( date );
            return date.toLocaleString();
        }
    }
};

</script>
<style lang="less">

[v-cloak] {display: none}

@media print {
    body * {
        visibility: hidden;
    }

    .wepos-modal-content {
        // display: none;
        visibility: hidden;
    }

    .wepos-checkout-print-wrapper {
        display: inline-block !important;
    }

    .wepos-checkout-print-wrapper * {
        visibility: visible;
    }

    .wepos-checkout-print-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;

        .header, .footer{
            padding: 5px;
            text-align: center;
        }

        .order-info {
            margin: 10px 0px 10px;
            border-bottom: 1px dashed #b7b7b7;
            padding: 10px 5px;
        }

        .content {
            table.sale-summary {
                width: 100%;
                border-collapse: collapse;
                tbody {
                    tr {
                        td {
                            font-size: 14px;
                            padding: 8px 10px;
                            &.name {
                                width: 60%;
                                font-weight: bold;
                                .attribute {
                                    margin-top: 2px;
                                    ul {
                                        margin: 0;
                                        padding: 0;
                                        list-style: none;
                                        li {
                                            display: inline-block;
                                            margin-right: 5px;
                                            font-size: 12px;
                                            font-weight: normal;

                                            .attr_name {
                                                color: #758598;
                                            }
                                        }
                                    }
                                }
                            }
                            &.quantity {
                                width: 12%;
                                color: #758598;
                            }
                            &.price {
                                text-align: right;
                                color: #758598;
                                span {
                                    color: #758598;

                                    &.regular-price {
                                        font-size: 12px;
                                        text-decoration: line-through;
                                        color: #9095A5;
                                        padding-right: 3px;
                                    }
                                }
                            }
                        }

                        &.cart-meta-data {
                            td {
                                .metadata {
                                    margin-left: 6px;
                                    color: #758598;
                                    font-size: 13px;
                                    font-weight: normal;
                                }
                            }
                        }

                        &.divider {
                            border-bottom: 1px dashed #b7b7b7;
                            color: #b5b5b5;
                        }
                    }
                }
            }
        }
    }
}
</style>