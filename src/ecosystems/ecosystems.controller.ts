import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { EcosystemsService } from './ecosystems.service';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { StoreEcosystemDto } from './dto/store-ecosystem.dto';
import { UpdateEcosystemDto } from './dto/update-ecosystem.dto';

@Controller('ecosystems')
@ApiTags('ecosystems')
export class EcosystemsController {
  constructor(private readonly ecosystemsService: EcosystemsService) {}

  @ResponseMessage('Store new a ecosystem')
  @Post()
  @ApiOperation({ summary: 'Store new a ecosystem' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Store new a ecosystem', {
      id: 1,
      created_at: '2024-05-20T19:49:52.062Z',
    }),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storeEcosystemDto: StoreEcosystemDto) {
    return this.ecosystemsService.store(storeEcosystemDto);
  }

  @ResponseMessage('Update a ecosystem by id')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a ecosystem by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Update a ecosystem by id', {
      id: 1,
      updated_at: '2024-05-20T19:49:52.062Z',
    }),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  update(@Param('id') id: number, @Body() updateEcosystemDto: UpdateEcosystemDto) {
    return this.ecosystemsService.update(id, updateEcosystemDto);
  }

  @ResponseMessage('Delete a ecosystem by id')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ecosystem by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Delete a ecosystem by id', {
      id: 1,
      deleted_at: '2024-05-20T19:49:52.062Z',
    }),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async remove(@Param('id') id: number) {
    return this.ecosystemsService.remove(id);
  }
}
