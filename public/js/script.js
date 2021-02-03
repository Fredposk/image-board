(function () {
    Vue.component('modelcomponent', {
        template: '#modal',
        data: function () {
            return {
                modalImage: [],
                postDate: '',
                isCommentOpen: false,
                commentId: undefined,
            };
        },
        props: ['id'],
        mounted: async function () {
            try {
                const data = await axios.get(`/modal/${this.id}`);
                this.modalImage = data.data.data[0];
                // console.log(this.modalImage);
                this.postDate = data.data.date;
            } catch (err) {
                console.log('err in /-Component: ', err);
            }
        },
        methods: {
            closeModal: function () {
                this.$emit('close');
                this.isCommentOpen = false;
                this.commentId = undefined;
            },
        },
    });

    Vue.component('commentcomponent', {
        template: '#comments',
        data: function () {
            return {
                comments: [],
                commentArea: '',
                username: '',
                isWaiting: false,
            };
        },
        props: ['Cid'],
        mounted: function () {
            axios
                .get(`/comment/${this.Cid}`)
                .then((response) => {
                    this.comments = response.data;
                })
                .catch((error) => {
                    console.log(error, 'error getting all comments');
                });
        },
        computed: {
            reversedComments() {
                return this.comments.slice(0).reverse();
            },
        },
        methods: {
            postcomment: function () {
                this.isWaiting = true;
                axios
                    .post('/comment', {
                        comment: `${this.commentArea}`,
                        id: `${this.Cid}`,
                        username: `${this.username}`,
                    })
                    .then((response) => {
                        this.comments.push(response.data);
                        this.commentArea = '';
                        this.username = '';
                        this.isWaiting = false;
                    })
                    .catch((err) =>
                        console.log(err, 'error in comment posting')
                    );
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
            searchbar: '',
            lastImage: '',
        },

        // mounted is a lifecycle method that runs when the Vue instance renders
        mounted: async function () {
            try {
                const data = await axios.get('/images');
                this.images = data.data;
                this.lastImage = this.images[this.images.length - 1].created_at;
            } catch (err) {
                console.log('err in /images: ', err);
            }
        },
        computed: {
            reversedImages() {
                return this.images.slice(0).reverse();
            },
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
                        this.images.unshift(response.data);
                        this.isOpen = false;
                        this.title = '';
                        this.description = '';
                        this.username = '';
                        this.file = null;
                        this.isLoading = false;
                        this.lastImage = this.images[
                            this.images.length - 1
                        ].created_at;
                    })
                    .catch((err) => {
                        console.log(err, 'in the consoleLog for the script');
                    });
            },
            fileSelectHandler: function (e) {
                this.file = e.target.files[0];
            },
            closeMe: function () {
                this.selectedImage = undefined;
                this.modelOpened = false;
            },
            loadMore: function () {
                axios
                    .get(`/loadmore/${this.lastImage}`)
                    .then((response) => {
                        this.images.push(...response.data);
                        this.lastImage = this.images[
                            this.images.length - 1
                        ].created_at;
                        // console.log(response);
                    })
                    .catch((err) => {
                        console.log('error getting more images');
                    });
            },
            searchfunction: function () {
                // console.log('search Images', this.searchbar);
                const searchResults = this.images.filter((image) => {
                    const regex = new RegExp(this.searchbar, 'gi');
                    image.title.match(regex) || image.description.match(regex);
                });
                console.log(searchResults);
            },
        },
    });
})();
