(function () {
    // Class tuesday
    Vue.component('modelcomponent', {
        template: '#modal',
        data: function () {
            return {
                modalImage: [],
                postDate: '',
            };
        },
        props: ['id'],
        mounted: async function () {
            try {
                const data = await axios.get(`/modal/${this.id}`);
                // console.log(data.data.data[0]);
                this.modalImage = data.data.data[0];
                this.postDate = data.data.date;
            } catch (err) {
                console.log('err in /-Component: ', err);
            }
        },
        methods: {
            closeModal: function () {
                this.$emit('close');
            },
        },
    });

    new Vue({
        // el - element in our html that has access to our Vue code!
        el: '#main',
        // data - an object that we add any info to that is dynamic / we want to render onscreen
        data: {
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
            isOpen: false,
            isLoading: false,
            isLiked: undefined,
            selectedImage: undefined,
            modelOpened: false,
        },

        // mounted is a lifecycle method that runs when the Vue instance renders
        mounted: async function () {
            try {
                const data = await axios.get('/images');
                this.images = data.data;
            } catch (err) {
                console.log('err in /images: ', err);
            }
        },

        // methods will store ALL the functions we create!!!
        methods: {
            clickHandler: function () {
                // console.log(this);
                const fd = new FormData();
                fd.append('title', this.title);
                fd.append('description', this.description);
                fd.append('username', this.username);
                fd.append('file', this.file);
                this.isLoading = true;
                axios
                    .post('/upload', fd)
                    .then((response) => {
                        // console.log(response);
                        this.images.unshift(response.data);
                        this.isOpen = false;
                        this.title = '';
                        this.description = '';
                        this.username = '';
                        this.file = null;
                        this.isLoading = false;
                    })
                    .catch((err) => {
                        console.log(err, 'in the consoleLog for the script');
                    });
            },
            fileSelectHandler: function (e) {
                this.file = e.target.files[0];
            },
            closeMe: function () {
                // console.log('heard the close');
                this.selectedImage = undefined;
                this.modelOpened = false;
            },
        },
    });
})();
