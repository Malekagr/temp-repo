import json
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///budget.db'
db = SQLAlchemy(app)



@app.cli.command('init')
def init():
    db.drop_all()
    db.create_all()
    print("budget.db created")


class Budgets(db.Model):
    id=db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(20))
    budgetLimit = db.Column(db.Integer)
    budgetSpent = db.Column(db.Integer)
    def __init__(self, title, money):
        self.title = title
        self.budgetLimit = money
        self.budgetSpent = 0
    def __repr__(self):
        return '<User %r>' % self.title

class Items(db.Model):
    id=db.Column(db.Integer, primary_key = True)
    budgetTitle = db.Column(db.String(20))
    itemPrice = db.Column(db.Integer)
    itemName = db.Column(db.String(20))
    uncategorized = db.Column(db.Integer)
    date = db.Column(db.Integer)
    def __init__(self, title, money, item, uncat, d):
        self.budgetTitle = title
        self.itemPrice = money
        self.itemName = item
        self.date = d
        self.uncategorized = uncat
    def __repr__(self):
        return '<User %r>' % self.itemName

def delPurchase(id):
    pch = Items.query.filter_by(id=id).first()
    a = pch.budgetTitle

    bud = Budgets.query.filter_by(title=a).first()
    if not bud is None:
        bud.budgetSpent = int(bud.budgetSpent)-int(pch.itemPrice)
    db.session.delete(pch)
    db.session.commit()
    return True

def addCat(name, budget):
    bgt = Budgets.query.filter_by(title=name).first()
    if(bgt is None):
        category = Budgets(name, budget)
        db.session.add(category)
        db.session.commit()
        return True
    return False

def addPurchase(name, cost, budgetTitle, uncat, date):
    if name is None or cost is None:
        return False
    bgt = Budgets.query.filter_by(title=budgetTitle).first()
    if(not bgt is None):
        bgt.budgetSpent = bgt.budgetSpent+int(cost)
    purchase = Items(budgetTitle, cost, name, uncat, date)
    db.session.add(purchase)
    db.session.commit()
    return True


def delCat(id):
    bgt = Budgets.query.filter_by(id=id).first()
    t = bgt.title
    item = Items.query.filter_by(budgetTitle=t)
    for i in item:
        db.session.delete(i)
        db.session.commit()
    db.session.delete(bgt)
    db.session.commit()
    return True

@app.route('/cats', methods = ["POST", "GET","DELETE"])
def cats():
    if request.method == 'DELETE' and 'del_budget_id' in request.json:
        return json.dumps({
            'completed': delCat(request.json['del_budget_id'])
        })
    if request.method == 'POST' and 'new_cat_name' in request.json and 'new_cat_limit' in request.json:
        return json.dumps({
            'completed': addCat(request.json['new_cat_name'], request.json['new_cat_limit'])
        })
    if request.method == 'GET':
        if 'cat' in request.args:
            return render_template("budgetPage.html")


@app.route('/purchases', methods=["POST", "GET", "DELETE"])
def purchases():
    print("Made it to Pirces!")
    if request.method == 'POST' and 'new_purchase_name' in request.json and 'new_purchase_price' in request.json:
        if 'uncat' in request.json:
            print("UNCAT")
            return json.dumps({
                'completed': addPurchase(request.json['new_purchase_name'], request.json['new_purchase_price'],
                                         request.json['new_purchase_budget'], 1, request.json['new_purchase_date'])
            })
        else:
            return json.dumps({
                'completed': addPurchase(request.json['new_purchase_name'], request.json['new_purchase_price'], request.json['new_purchase_budget'], 0, request.json['new_purchase_date'])
            })
    elif request.method == "DELETE":
        print("DELETING")
        if 'del_purchase_id' in request.json:
            return json.dumps({
                'completed': delPurchase(request.json['del_purchase_id'])
            })


#@app.route('/cats', methods =["POST"])
#def room():
 #   return render_template("category.html")

@app.route('/purchases/<string:title>')
def budget(title):
    if not title == "uncategorized":
        pl = Items.query.filter_by(budgetTitle = title)
        budget = Budgets.query.filter_by(title=title).first()
        s = budget.budgetSpent
        t = budget.budgetLimit
        return render_template("budgetPage.html", title=title, pl = pl, spent = s, budget = t)
    else:
        pl = Items.query.filter_by(uncategorized = 1)

        s= 0
        for i in pl:
            s += int(i.itemPrice)
        t = "None"
        return render_template("budgetPage2.html", title=title, pl = pl, spent = s, budget = t)

@app.route("/")
def default():
	#return render_template("home.html", items=items)
    bl = Budgets.query.all()
    uSpent = 0
    b = Items.query.filter_by(uncategorized=1)
    for a in b:
       uSpent += int(a.itemPrice)

    return render_template("frontpage.html", spent = uSpent, bl = bl)



if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    app.run()
