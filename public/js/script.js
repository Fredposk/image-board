(function () {
    new Vue({
        // el - element in our html that has access to our Vue code!
        el: '#main',
        // data - an object that we add any info to that is dynamic / we want to render onscreen
        data: {
            images: [],
        },

        // mounted is a lifecycle method that runs when the Vue instance renders
        mounted: async function () {
            var self = this;
            // axios
            //     .get('/images')
            //     .then(function (response) {
            //         // console.log("this inside axios: ", self);
            //         // axios will ALWAYS store the info coming from the server inside a 'data' property
            //         console.log('response from /images: ', response.data);
            //         self.images = response.data;
            //     })
            //     .catch(function (err) {
            //         console.log('err in /images: ', err);
            //     });
            try {
                const data = await axios.get('/images');
                self.images = data.data;
            } catch (err) {
                console.log('err in /images: ', err);
            }
        },

        // methods will store ALL the functions we create!!!
        methods: {
            myFunction: function () {
                console.log('myFunction is running!!!!');
            },
        },
    });
})();
