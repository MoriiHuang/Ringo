# Generated by Django 3.2 on 2022-12-11 15:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PersonalProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(default='请输入昵称', max_length=20)),
                ('avatar', models.ImageField(default='default_avatar.png', upload_to='avatar/%Y/%m/%d')),
                ('address', models.CharField(default='请输入地址', max_length=255)),
                ('signature', models.CharField(default='编辑个性签名', max_length=255)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
