package com.paypal.android.pizza;

import com.android.gservicesampletest.R;

import android.content.Context;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

public class HomePage extends BasePage implements OnClickListener {
	
	//The different elements of our page
	NavBar mainNavBar;
	Button buyButton;
	LinearLayout insideLayout;

	public HomePage(Context context) {
		super(context);

		//Setup our page
		insideLayout = new LinearLayout(context);
		insideLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.setOrientation(LinearLayout.VERTICAL);
		insideLayout.setBackgroundResource(R.drawable.bg);
		addView(insideLayout);
		
		mainNavBar = new NavBar(context, this);
		mainNavBar.titleText.setText("Home");
		mainNavBar.leftButton.setText("");
		mainNavBar.leftButton.setVisibility(INVISIBLE);
		mainNavBar.rightButton.setText("");
		mainNavBar.rightButton.setVisibility(INVISIBLE);
		insideLayout.addView(mainNavBar);
		
		ImageView pizzaLogo = new ImageView(context);
		pizzaLogo.setImageResource(R.drawable.pizzaexpress);
		pizzaLogo.setPadding(0, 25, 0, 50);
		insideLayout.addView(pizzaLogo);
		
		RelativeLayout buttonLayout = new RelativeLayout(context);
		buttonLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(buttonLayout);
		
		buyButton = new Button(context);
		RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(200, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		buyButton.setLayoutParams(params);
		buyButton.setText("Buy a pizza!");
		buyButton.setOnClickListener(this);
		buttonLayout.addView(buyButton);
	}

	@Override
	public void onClick(View v) {
		if (v == buyButton) {
			//User selected customize button, so change the page
			Pizza.getInstance().changePage(Pizza.PAGE_CUSTOMIZE);
		}
	}

	@Override
	public void update() {
		//Not used for this page
	}

	@Override
	public void saveValues() {
		//Not used for this page
	}

}
