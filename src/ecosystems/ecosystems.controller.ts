import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { EcosystemsService } from './ecosystems.service';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { StoreEcosystemDto } from './dto/store-ecosystem.dto';
import { UpdateEcosystemDto } from './dto/update-ecosystem.dto';
import { EcosystemMock } from '@shared/utils/mocks/ecosystem.mock';

@Controller('ecosystems')
@ApiTags('ecosystems')
export class EcosystemsController {
  constructor(private readonly ecosystemsService: EcosystemsService) {}

  @ResponseMessage('Store new a ecosystem')
  @Post()
  @ApiOperation({ summary: 'Store new a ecosystem' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Store new a ecosystem', EcosystemMock.store),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storeEcosystemDto: StoreEcosystemDto) {
    return this.ecosystemsService.store(storeEcosystemDto);
  }

  @ResponseMessage('Update a ecosystem by id')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a ecosystem by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Update a ecosystem by id', EcosystemMock.update),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  update(@Param('id') id: number, @Body() updateEcosystemDto: UpdateEcosystemDto) {
    return this.ecosystemsService.update(id, updateEcosystemDto);
  }

  @ResponseMessage('Delete a ecosystem by id')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ecosystem by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Delete a ecosystem by id', EcosystemMock.delete),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async remove(@Param('id') id: number) {
    return this.ecosystemsService.remove(id);
  }
}
