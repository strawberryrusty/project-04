# Generated by Django 2.2.5 on 2019-09-05 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gymapp', '0006_personalbest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personalbest',
            name='date',
            field=models.DateField(),
        ),
    ]