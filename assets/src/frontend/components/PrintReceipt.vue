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
            var html = window.document.getElementsByClassName('wepos-checkout-print-wrapper')[0].innerHTML;
            var txt = htmlToText(html);
            
            if (orderdata.payment_method == "wepos_shoplit" && typeof window.Shoplit != 'undefined') {
                // This takes the receipt DV and sends it to Shoplit
                var html = window.document.getElementsByClassName('wepos-checkout-print-wrapper')[0].innerHTML;
                
                window.Shoplit.printReceipt(htmlToText(html));
                return;
            }

            setTimeout( () => {
                window.print();
            }, 500);
        }
    }
};

function htmlToText(html){
    html = html.replace(/<div>/g, "");
    html = html.replace(/<\/div>/g, "\n");
    html = html.replace(/<\!--.*?-->/g, "");
    html = html.replace(/\n\s*/g, "\n");

    //parse html into text
    var dom = (new DOMParser()).parseFromString('<!doctype html><body>' + html, 'text/html');
    return dom.body.textContent;
}
</script>

<style lang="less">

#wepos-print-receipt {
    display: inline;
}

</style>
