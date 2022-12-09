# Generated by Django 3.1.1 on 2022-12-09 03:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='goodscategory',
            options={'verbose_name': '物品类目', 'verbose_name_plural': '物品类目'},
        ),
        migrations.AlterField(
            model_name='goods',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goods.goodscategory', verbose_name='物品类目'),
        ),
        migrations.AlterField(
            model_name='goodscategory',
            name='code',
            field=models.CharField(default='', help_text='唯一类目代码', max_length=30, verbose_name='类目代码'),
        ),
        migrations.AlterField(
            model_name='goodscategory',
            name='desc',
            field=models.TextField(default='', help_text='类目描述', verbose_name='类目描述'),
        ),
        migrations.AlterField(
            model_name='goodscategory',
            name='name',
            field=models.CharField(default='', help_text='类目名', max_length=30, verbose_name='类目名'),
        ),
        migrations.AlterField(
            model_name='goodscategory',
            name='parent_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='goods.goodscategory', verbose_name='父类目代码'),
        ),
    ]
