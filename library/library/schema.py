import graphene
from graphene_django import DjangoObjectType
from userapp.models import User
from todoapp.models import Project, Todo


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        field = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        field = '__all__'


class Query(graphene.ObjectType):

    all_user = graphene.List(UserType)
    all_project = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=False))
    project_by_username = graphene.List(ProjectType, username=graphene.String(required=False))

    def resolve_all_user(root, info):
        return User.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    # поиск по id
    def resolve_todo_by_id(self, info, id):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None

    def resolve_project_by_username(self, info, username=None):
        project = Project.objects.all()
        if username:
            project = project.filter(created_by__username=username)
        return project


class UserMutation(graphene.Mutation):

    class Arguments:
        id = graphene.ID()
        username = graphene.String(required=True)
        email = graphene.String(required=False)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id, username, email):
        user = User.objects.get(pk=id)
        user.username = username
        user.email = email
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):

    update_user = UserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
