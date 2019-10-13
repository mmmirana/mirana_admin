let router = {
    preffix: 'book',
    routers: [
        {
            path: "add",
            view: 'book_add'
        },
        {
            path: "edit",
            view: "book_edit"
        },
    ]
};
export default router