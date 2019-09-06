# Generated by Django 2.2.5 on 2019-09-05 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gymapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='exercise',
            name='categories',
            field=models.ManyToManyField(blank=True, related_name='books', to='gymapp.Category'),
        ),
    ]