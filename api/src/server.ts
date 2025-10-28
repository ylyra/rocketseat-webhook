import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { routes } from "./routes/routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	// credentials: true,
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Webhook Inspector API",
			description: "API for the Webhook Inspector",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(import("@scalar/fastify-api-reference"), {
	routePrefix: "/docs",
});

app.register(routes, {
	prefix: "/api",
});

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log("🔥 HTTP server running on http://localhost:3333");
	console.log("📚 API documentation available at http://localhost:3333/docs");
});
