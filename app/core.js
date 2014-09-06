define([
    "app/views/application",
    "app/views/index",
    "app/views/post/posts_index",
    "app/views/post/post_create_or_edit",
    "app/views/post/post",
    "app/views/admin/admin",
    "app/views/admin/admin_navigation",
    "app/views/chat/chat",

    "app/views/errors/unfound",

    "app/views/modal/modal",
    "app/views/modal/modal_body",
    "app/views/modal/login",
    "app/views/modal/create_account",
    "app/views/modal/forgot",
    "app/views/modal/reset",

    "app/store",
    "app/models/user",
    "app/models/post",
    "app/models/term",
    "app/models/comment",
    "app/models/message",

    "app/models/transforms/array",

    "app/controllers/notification_controller",

    "app/controllers/post/posts_controller",
    "app/controllers/post/posts_new_controller",
    "app/controllers/post/post_controller",
    "app/controllers/post/comments_controller",

    "app/controllers/admin/admin",
    "app/controllers/admin/admin_navigation",

    "app/controllers/chat/chat_controller",

    "app/controllers/modal/modal_controller",
    "app/controllers/modal/login_controller",
    "app/controllers/modal/create_account_controller",
    "app/controllers/modal/forgot_controller",
    "app/controllers/modal/reset_controller",

    "app/router",
    "app/routes/index",
    "app/routes/posts_index",
    "app/routes/posts_new",
    "app/routes/posts_edit",
    "app/routes/post",
    "app/routes/reset_password",
    "app/routes/admin",

    // 给View添加i18n
    "app/mixins/view", 
    "app/mixins/component",

    // Handlebars模版添加Helper
    "app/mixins/handlebars_helper",
], function(
    ApplicationView, IndexView, PostsIndexView, PostCreateOrEditView, PostView, 
    AdminView, AdminNavigationView, 
    ChatView,

    ErrorsUnfoundView, 

    ModalView, ModalBodyView, LoginView, CreateAccountView, ForgotView, ResetView,
    Store, User, Post, Term, Comment, Message,
    ArrayTransform,
    NotificationController,
    PostsController, PostsNewController, PostController, CommentsController, 
    AdminController, AdminNavigationController, 
    ChatController,
    ModalController, LoginController, CreateAccountController, ForgotController, ResetController,
    Router, IndexRoute, PostsIndexRoute, PostsNewRoute, PostsEditRoute, PostRoute, ResetpasswordRoute, AdminRoute) {
    /*Module Pattern*/
    var App = {
        ApplicationView: ApplicationView,
        IndexView: IndexView,
        PostsIndexView: PostsIndexView,
        PostCreateOrEditView: PostCreateOrEditView,
        PostView: PostView,

        AdminView: AdminView, 
        AdminNavigationView: AdminNavigationView, 

        ChatView: ChatView,

        ErrorsUnfoundView: ErrorsUnfoundView,

        ModalView: ModalView, 
        ModalBodyView: ModalBodyView, 
        LoginView: LoginView, 
        CreateAccountView: CreateAccountView, 
        ForgotView: ForgotView, 
        ResetView: ResetView,

        // Specifying a custom Store for Ember Data on your global namespace as `App.Store` has been deprecated. Please use `App.ApplicationStore` instead.
        // Store: Store,
        ApplicationStore: Store,
        User: User,
        Post: Post,
        Term: Term,
        Comment: Comment,
        Message: Message,

        ArrayTransform: ArrayTransform,

        NotificationController: NotificationController,

        PostsController: PostsController,
        PostsNewController: PostsNewController,
        PostController: PostController,
        CommentsController: CommentsController,

        AdminController: AdminController, 
        AdminNavigationController: AdminNavigationController, 

        ChatController: ChatController,

        ModalController: ModalController,
        LoginController: LoginController,
        CreateAccountController: CreateAccountController,
        ForgotController: ForgotController,
        ResetController: ResetController,

        Router: Router,
        IndexRoute: IndexRoute,
        PostsIndexRoute: PostsIndexRoute,
        PostsNewRoute: PostsNewRoute,
        PostsEditRoute: PostsEditRoute,
        PostRoute: PostRoute,
        ResetpasswordRoute: ResetpasswordRoute,
        AdminRoute: AdminRoute
    }

    return App;
})

