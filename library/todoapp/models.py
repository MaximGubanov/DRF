from django.db import models
from uuid import uuid4

from userapp.models import User


#  хотел сделать промежуточную таблицу, но как-то обошёлся без нее, поэтому UserProject и не нужн, но решил оставить...
class UsersProject(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo = models.ForeignKey('ToDo', on_delete=models.CASCADE)


class Project(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    title = models.CharField(verbose_name='Название проекта', max_length=32)
    #  repo = не понял на какой реп-ий должен проект ссылаться, в данном случае у меня нет таких ссылок
    users = models.ManyToManyField(User)


class ToDo(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    text = models.TextField(verbose_name='Текст заметки')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    update_at = models.DateField(verbose_name='Последнее обновление', auto_now=True)
    is_active = models.BooleanField(default=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, null=True, related_name='projects')
    #  внешний ключ ссылается на uuid в Project, поэтому когда я создаю заметку, нужно указать для какого именно проекта
    #  я его создаю, но в поле списков только наборы uuid и это не удобно, трудно же запомнить какой uuid от какого
    #  проекта... как сделать чтобы в поле выбора проекта было название проекта?