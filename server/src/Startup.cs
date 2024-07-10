using System;
using Cookbook.API.Configuration;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Bson.Serialization.Conventions;
using Cookbook.API.Extensions;

namespace Cookbook.API;

public class Startup(IConfiguration configuration)
{
	readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

	public IConfiguration Configuration { get; } = configuration;

	// This method gets called by the runtime. Use this method to add services to the container.
	public void ConfigureServices(IServiceCollection services)
	{
		services.AddCors(options =>
		{
			options.AddPolicy(name: MyAllowSpecificOrigins,
							  builder =>
							  {
								  var section = Configuration.GetSection("CorsSites").Get<string[]>();

								  builder
									.WithOrigins(section)
									.AllowAnyHeader()
									.AllowAnyMethod();
							  });
		});

		var authenticationSettings = new AuthenticationSettings();
		Configuration.GetSection("Authentication").Bind(authenticationSettings);
		services.AddSingleton(authenticationSettings);

		services.AddMongoDb(Configuration);

		services.AddAuthentication(
			options =>
			{
				options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultSignOutScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			})
			.AddCookie((options) =>
			{
				options.Cookie.Name = "CookbookCookie";
				options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
				options.SlidingExpiration = true;
				options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict;
			});

		services.AddControllers();
		services.AddSwaggerGen(c =>
		{
			c.SwaggerDoc("v1", new OpenApiInfo { Title = "Cookbook.API", Version = "v1" });
		});

		services.AddCookbookServices();

		services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Startup).Assembly));

		var conventionPack = new ConventionPack { new CamelCaseElementNameConvention() };
		ConventionRegistry.Register("camelCase", conventionPack, t => true);
	}

	// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
	public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		if (env.IsDevelopment())
		{
			app.UseDeveloperExceptionPage();
			app.UseSwagger();
			app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cookbook.API v1"));
		}

		app.UseHttpsRedirection();

		app.UseRouting();

		app.UseCors(MyAllowSpecificOrigins);

		app.UseAuthentication();
		app.UseAuthorization();

		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}
