# Generated by Django 2.2.5 on 2019-09-11 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gymapp', '0014_auto_20190911_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programme',
            name='image',
            field=models.CharField(default='https://www.chardandilminsternews.co.uk/resources/images/9833873.jpg?display=1&htype=0&type=responsive-gallery', max_length=500),
        ),
    ]
