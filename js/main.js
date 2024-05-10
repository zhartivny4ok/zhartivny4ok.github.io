var app = new Vue({
    el: "#products",
    data: {
        products: [{ id: 1, title: "Lemon 1", short_text: 'Cool Lemon1', image: 'images/lem1.png', desc: "Lemons are the perfect way to add freshness and flavor to any drink or dish, from smoothies to salads." },
        { id: 2, title: "Lemon 2", short_text: 'Cool cool Lemon2', image: 'images/lem2.png', desc: "On a hot summer day, something refreshing and pleasant is like ice-cold lemonade with slices of fresh lemon." },
        { id: 3, title: "Lemon 3", short_text: 'Cool cool cool Lemon3', image: 'images/lem3.png', desc: "The fresh aroma of lemon helps create a cozy and refreshing air in the home, especially when cut into slices and left on the counter." },
        { id: 4, title: "Lemon 4", short_text: 'Cool cool cool cool Lemon4', image: 'images/lem4.png', desc: "Lemons are not only a tasty treat, they are also good for your health, being a rich source of vitamin C and antioxidants."},
        { id: 5, title: "Lemon 5", short_text: 'Cool cool cool cool cool Lemon5', image: 'images/lem5.png', desc: "The scent of lemon zest can lift your mood and improve concentration, so even a simple lemon-scented candle can create a cozy atmosphere in your home." }],
        btnVisible: 0,
        product: { },
        cart: [],
        contactFields: [],
        orderSubmitted: false
    },
    mounted: function () {
        console.log(window.localStorage.getItem('prod'));
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    



    methods: {
        addItem: function (id) {
            window.localStorage.setItem('prod', id);
        },

        addToCart: function (id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = 1;
            }
        },
        getProduct: function () {
            if(window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id) this.product=this.products[i];
                    }
                }
            }
        },
        checkInCart:function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf (String (this.product.id))!=-1) this.btnVisible=1;
        },

        getCart: function () {
            var cartIds = [];
            if (window.localStorage.getItem('cart')) {
                cartIds = window.localStorage.getItem('cart').split(',');
            }
            for (i in this.products) {
                if (this.products[i] && this.products[i].id && cartIds.includes(String(this.products[i].id) )) this.cart.push(this.products[i]);
            }

        },
        removeFromCart: function (id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            var index = cart.indexOf(String(id));
            if (index > -1) {
                cart.splice(index, 1);
                window.localStorage.setItem('cart', cart.join());
                this.cart = [];
                this.getCart();
            }
        },
        makeOrder: function () {
            this.cart = [];
            localStorage.removeItem('cart');
            this.orderSubmitted = true;
          }
    }
});