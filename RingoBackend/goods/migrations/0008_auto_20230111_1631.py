# Generated by Django 3.2 on 2023-01-11 16:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0007_auto_20221229_1910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goods',
            name='add_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 11, 16, 31, 27, 929511), verbose_name='添加时间'),
        ),
        migrations.AlterField(
            model_name='goods',
            name='expected_end_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 11, 16, 31, 27, 928514), help_text='预期结束时间点(only 需求)', verbose_name='结束时间'),
        ),
        migrations.AlterField(
            model_name='goodscategory',
            name='add_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 11, 16, 31, 27, 928514), verbose_name='添加时间'),
        ),
    ]