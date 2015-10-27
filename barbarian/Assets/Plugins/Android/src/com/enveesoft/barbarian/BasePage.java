package com.paypal.android.pizza;

import android.content.Context;
import android.widget.ScrollView;

/*
 * The abstract base class for our different pages.
 */
public abstract class BasePage extends ScrollView {
	
	public BasePage(Context context) {
		super(context);
		setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
	}
	
	public abstract void update();
	
	public abstract void saveValues();

}
