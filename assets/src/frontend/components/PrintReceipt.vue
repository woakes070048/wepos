<template>
    <div id="wepos-print-receipt" v-cloak>
        <button class="print-btn" @click.prevent="printReceipt()">
            <span class="icon flaticon-printer"></span>
            <span class="label">{{ __( 'Print Receipt', 'wepos' ) }}</span>
        </button>
    </div>
</template>

<script>

export default {
    name: 'ReceiptPrint',

    methods: {
        printReceipt() {
            var orderdata = this.$store.state.Order.orderdata;
            if (orderdata.payment_method == "wepos_shoplit") {
              window.Shoplit.printReceipt(JSON.stringify(orderdata));
              return;
            }

            setTimeout( () => {
                window.print();
            }, 500);
        }
    }
};

</script>

<style lang="less">

#wepos-print-receipt {
    display: inline;
}

</style>
